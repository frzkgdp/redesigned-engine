import { Body, Controller, Post } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

interface EmployeeMessage {
  routingKey: string;
  data: any;
}

@Controller('employee')
export class EmployeeController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  // TODO: create a higher order function to handle publishing messages
  @Post()
  async createEmployee(@Body() body: EmployeeMessage) {
    return this.amqpConnection.publish('extension_server_exchange', body.routingKey, body.data, { headers: { tenant: 'TENANT_NAME_HERE' } });
  }
}
