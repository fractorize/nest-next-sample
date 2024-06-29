import { Controller } from "@nestjs/common";
import { EmailService } from "./email.service";
import { Email } from "src/types/email";

import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern("sendEmail")
  sendEmail(
    @Payload() email: Email,
    @Ctx() context: RmqContext,
  ): Promise<boolean> {
    try {
      const result = this.emailService.sendEmail(email);
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
      return result;
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  }
}
