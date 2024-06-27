import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  const configService = app.get(ConfigService);
  const authGuard = app.select(AuthModule).get(AuthGuard);
  app.useGlobalGuards(authGuard);
  const port = configService.get<number>('port')!;
  await app.listen(port);

  console.log(`API server is running on: ${await app.getUrl()}`);
}

bootstrap();
