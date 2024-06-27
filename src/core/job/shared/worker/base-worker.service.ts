import { Injectable } from '@nestjs/common';
import { RabbitHandlerConfig } from '@golevelup/nestjs-rabbitmq';
import { Channel, ConsumeMessage } from 'amqplib';
import * as dotenv from 'dotenv';
import { RabbitMQTopicsEnum } from './rabbitmq-topics.enum';

/**
 * @ISSUE
 * Because `RabbitSubscribe` decorator is used on application bootstrap to register the RabbitMQ handlers,
 * it is not possible to inject services into the handler class. This is because of the lifecycle of the
 * NestJS application. The RabbitMQ handlers are registered before all the modules are loaded/initialized.
 * This affects not only the `RabbitSubscribe` options but also the `RabbitSubscribe` error handler,
 * Some potential issue is that we can't inject TypeORM services to handle DB transaction when job failed,
 * or CacheService to check for rate limit.
 */
@Injectable()
export class BaseWorkerService {
  protected static defaultErrorHandler(channel: Channel, msg: ConsumeMessage, error: any) {
    /**
     * Will handle these error cases
     * 1. Rate limit error
     * 2. OnFailed Job -> update job status to failed on DB
     * 3. Unknown error -> for now Reject Message, TODO: handle this case properly
     */
    console.log(`Tenant: ${msg.properties.headers.tenant}`);
    console.error(`Error processing message: ${error.message}`);
    if (error.message === 'ERROR_RATE_LIMIT') {
      /**
       * @TODO
       * Handle delay and priority to prevent instant requeue
       * Check on amqplib documentation for more info about priority in messages
       */
      // Requeue message with changes to maxRetryAttempt value
      channel.nack(msg, false, true);
    }
    // Reject message for other errors
    channel.nack(msg, false, false);
  }

  protected static getWorkerConfig(topicName: RabbitMQTopicsEnum): Partial<RabbitHandlerConfig> {
    dotenv.config();
    return {
      exchange: process.env[`RABBITMQ_TOPIC_${topicName}_EXCHANGE`] ?? 'extension_server_exchange',
      routingKey: process.env[`RABBITMQ_TOPIC_${topicName}_ROUTING_KEY`] ?? 'employee.create.*',
      queue: process.env[`RABBITMQ_TOPIC_${topicName}_QUEUE`] ?? 'employee_create_queue'
    };
  }
}
