import { Module } from "@nestjs/common";
import { ProducerService } from "./producer.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService, ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "EMAIL_QUEUE",
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [`${configService.get("RABBITMQ_URL")}`],
              queue: configService.get("EMAIL_QUEUE_NAME"),
            },
          };
        },
      },
    ]),
  ],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class QueueModule {}
