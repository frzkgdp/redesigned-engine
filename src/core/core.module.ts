import { Global, Module } from '@nestjs/common';
import { LibConfigModule } from '../config/lib-config.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQConfigService } from '../config/rabbitmq-config.service';

@Global()
@Module({
  imports: [
    LibConfigModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [LibConfigModule],
      useClass: RabbitMQConfigService
    })
  ],
  exports: [RabbitMQModule]
})
export class CoreModule {}
