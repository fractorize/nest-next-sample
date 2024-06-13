import { Module } from '@nestjs/common';
import { TrpcService } from '@api/trpc/trpc.service';
import { TrpcRouter } from './trpc.router';

@Module({
  imports: [],
  controllers: [],
  providers: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
