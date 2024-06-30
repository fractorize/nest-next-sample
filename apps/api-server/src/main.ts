import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module';
// import { AuthGuard } from './auth/auth.guard';
// import { AccessModule } from './access/access.module';
// import { AccessGuard } from './access/access.guard';


async function bootstrap() {
  const logger = new Logger('IMPORTANT');
  logger.error('=========================================================');
  logger.warn('ENSURE RabbitMQ is running on the appropriate port!!!');
  logger.warn('There will be an UnhandledPromiseRejection otherwise!!');
  logger.error('=========================================================');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  const configService = app.get(ConfigService);
  // APP_GUARD providers in app.module seems to be enough!! The following useGlobalGuards might not be needed!!!
  // const authGuard = app.select(AuthModule).get(AuthGuard);
  // const accessGuard = app.select(AccessModule).get(AccessGuard);
  // app.useGlobalGuards(authGuard, accessGuard);
  const port = configService.get<number>('port')!;
  await app.listen(port);

  console.log(`API server is running on: ${await app.getUrl()}`);
}

bootstrap();
