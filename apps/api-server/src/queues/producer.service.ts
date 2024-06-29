import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Email } from "../types/email";

@Injectable()
export class ProducerService {
  constructor(@Inject("EMAIL_QUEUE") private client: ClientProxy) {
    this.client.connect();
  }

  addToEmailQueue(mail: Email) {
    try {
      this.client.emit("sendEmail", mail);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "Error adding mail to queue",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
