import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Email } from "src/types/email";

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(data: Email) {
    const result = await this.mailService.sendMail(data);
    return result;
  }
}
