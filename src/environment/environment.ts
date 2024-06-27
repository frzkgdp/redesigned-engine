export default () => ({
  rabbitmq: {
    tenant: process.env.RABBITMQ_TENANT,
    moduleOptions: {
      exchanges: [
        {
          name: process.env.RABBITMQ_EXCHANGE_NAME ?? 'extension_server_exchange',
          type: process.env.RABBITMQ_EXCHANGE_TYPE ?? 'topic'
        }
      ],
      connectionManagerOptions: {
        connectionOptions: {
          clientProperties: {
            connection_name: process.env.RABBITMQ_CONNECTION_NAME ?? 'extension_server'
          }
        }
      },
      uri: process.env.RABBITMQ_URI ?? 'amqp://guest:guest@localhost:5672',
      connectionInitOptions: { wait: false }
    },
    topics: {
      employee: {
        exchange: process.env.RABBITMQ_TOPIC_EMPLOYEE_EXCHANGE ?? 'extension_server_exchange',
        routingKey: process.env.RABBITMQ_TOPIC_EMPLOYEE_ROUTING_KEY ?? 'employee.create.*',
        queue: process.env.RABBITMQ_TOPIC_EMPLOYEE_QUEUE ?? 'employee_create_queue'
      }
    }
  }
});
