import { Injectable, Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Email } from "src/types/email";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(email: Email) {
    try {
      const result = await this.mailService.sendMail(email);
      this.logger.log(`Email sent successfully to ${email.to}`);
      return !!result;
    } catch (error) {
      this.logger.error(`Error sending email to ${email.to}`);
      throw error;
    }
  }
}
