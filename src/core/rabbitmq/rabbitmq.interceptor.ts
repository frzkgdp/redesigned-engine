import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { isRabbitContext, Nack } from '@golevelup/nestjs-rabbitmq';
import * as _ from 'lodash';
import { of } from 'rxjs';

@Injectable()
export class RabbitMQInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    if (isRabbitContext(context)) {
      /*
       * rmq context args:
       * 0: message
       * 1: amqp original message
       * 2: headers
       */
      const headers = context.getArgByIndex(2);
      const tenant = headers.tenant;
      if (this.isTenantInvalid(tenant)) {
        console.log('intercepted!');
        return of(new Nack(true));
      }

      return next.handle();
    }
    // Execute custom interceptor logic for HTTP request/response
    return next.handle();
  }

  private isTenantInvalid(tenant: string): boolean {
    const rabbitMQConfig = this.configService.get('rabbitmq');
    return !_.isEmpty(rabbitMQConfig.tenant) && tenant !== rabbitMQConfig.tenant;
  }
}
