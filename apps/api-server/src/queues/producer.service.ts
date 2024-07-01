import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { Email } from "../types/email";

@Injectable()
export class ProducerService {
  private messagingEnabled: boolean;
  constructor(
    @Inject("EMAIL_QUEUE") private client: ClientProxy,
    private configService: ConfigService,
  ) {
    this.messagingEnabled =
      this.configService.get("ENABLE_MESSAGING") === "true";
    if (this.messagingEnabled) {
      this.client.connect();
    }
  }

  addToEmailQueue(mail: Email) {
    try {
      if (this.messagingEnabled) {
        this.client.emit("sendEmail", mail);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "Error adding mail to queue",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
