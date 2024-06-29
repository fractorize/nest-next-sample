import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailService } from "./email.service";
import { EmailController } from "./email.controller";

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: `${configService.get("EMAIL_HOST")}`,
            port: `${configService.get("EMAIL_PORT")}`,
            auth: {
              user: `${configService.get("EMAIL_SENDER_ADDRESS")}`,
              pass: `${configService.get("EMAIL_SENDER_PASSWORD")}`,
            },
          },
        };
      },
    }),
  ],
  providers: [ConfigService, EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
