import { Inject, Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMAIL_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'emailQueue',
        },
      },
    ]),
  ],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class QueueModule {}
