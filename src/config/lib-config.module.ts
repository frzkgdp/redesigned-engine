import { Module } from '@nestjs/common';
import { RabbitMQConfigService } from './rabbitmq-config.service';

@Module({
  providers: [RabbitMQConfigService],
  exports: [RabbitMQConfigService]
})
export class LibConfigModule {}
