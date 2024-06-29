import configuration from "../config/configuration";
import { ConfigModule, ConfigService } from "@nestjs/config"; //Should always be the first import
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmailModule } from "./email/email.module";
import { EmailController } from "./email/email.controller";
import { EmailService } from "./email/email.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["../.env.local", "./.env"],
      load: [configuration],
    }),
    EmailModule,
  ],
  controllers: [AppController, EmailController],
  providers: [AppService, ConfigService, EmailService],
})
export class AppModule {}
