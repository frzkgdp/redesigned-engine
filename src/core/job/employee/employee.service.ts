import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitMQWorker } from '../shared/worker/rabbitmq-worker.decorator';
import { RabbitMQTopicsEnum } from '../shared/worker/rabbitmq-topics.enum';
import { BaseWorkerService } from '../shared/worker/base-worker.service';

@Injectable()
export class EmployeeService extends BaseWorkerService {
  @RabbitMQWorker(BaseWorkerService.getWorkerConfig(RabbitMQTopicsEnum.EMPLOYEE), BaseWorkerService.defaultErrorHandler)
  public async createEmployee(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    console.log(new Date().toDateString());
    console.log('Processing message...');
    // setTimeout 15 seconds
    await new Promise((resolve) => setTimeout(resolve, 15000));
    // Check to cache if rate limit exists
    if (message.id === '456') {
      throw new Error('ERROR_RATE_LIMIT');
    }
    if (message.id === '123') {
      throw new Error('SOME_OTHER_ERROR');
    }
    console.log(`Routing key: ${JSON.stringify(amqpMsg)}`);
    console.log(`Message: ${JSON.stringify(message)}`);

    // Do something else, call other services, etc.
  }
}
