import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TrpcRouter } from '@api/trpc/trpc.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
    }),
  );
  const trpcRouter = app.get(TrpcRouter);
  await trpcRouter.applyMiddleware(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port')!;
  await app.listen(port);

  console.log(`API server is running on: ${await app.getUrl()}`);
}

bootstrap();
