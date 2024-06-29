import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('greet')
  sayHello(@Payload() data: string, @Ctx() context: RmqContext): string {
    console.log('GREET', data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return 'Hello World!';
  }

  @MessagePattern({ cmd: 'sendEmail' })
  accumulate(@Payload() data: number[], @Ctx() context: RmqContext): number {
    console.log('GOTCHA', data, typeof Array.from(data));
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return Array.from((data || [])).reduce((a, b) => a + b);
  }

}
