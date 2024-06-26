import { Module } from '@nestjs/common';
import { TrpcService } from '@api/trpc/trpc.service';
import { TrpcRouter } from './trpc.router';
import { EmployeeModule } from '@api/modules/employee/employee.module';
import { AuthModule } from '@api/auth/auth.module';

@Module({
  imports: [EmployeeModule, AuthModule],
  controllers: [],
  providers: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
