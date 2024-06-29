import { ConfigModule, ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(ConfigModule);
  const configService = appContext.get(ConfigService);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`${configService.get("RABBITMQ_URL")}`],
        queue: configService.get("EMAIL_QUEUE_NAME"),
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  app.listen();
}

bootstrap();
