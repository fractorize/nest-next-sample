import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  constructor(@Inject('EMAIL_QUEUE') private client: ClientProxy) {
    this.client.connect();
  }

  async addToEmailQueue(mail: any) {
    try {
      this.client.emit({ cmd: 'sendEmail' }, [1,2,3]).subscribe((res) => {
        console.log(res);
      });
      this.client.emit('greet', 'Manoj');
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error adding mail to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
