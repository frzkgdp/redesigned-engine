/* eslint-disable @typescript-eslint/ban-types */
import { RabbitHandlerConfig, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Channel, ConsumeMessage } from 'amqplib';

export function RabbitMQWorker(
  config: Partial<RabbitHandlerConfig>,
  errorHandler: (channel: Channel, msg: ConsumeMessage, error: any) => void
): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol | undefined,
  descriptor?: TypedPropertyDescriptor<Y> | undefined
) => void {
  return RabbitSubscribe({
    ...config,
    queueOptions: {
      arguments: {
        'x-match': 'any'
      }
    },
    errorHandler
  });
}
