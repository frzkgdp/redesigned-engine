import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQConfigService {
  constructor(private readonly configService: ConfigService) {}

  createModuleConfig(): RabbitMQConfig {
    const rabbitmqOptions = this.configService.get('rabbitmq');
    return rabbitmqOptions.moduleOptions;
  }
}
