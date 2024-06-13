import { Module } from '@nestjs/common';
import { TrpcService } from '@api/trpc/trpc.service';
import { TrpcRouter } from './trpc.router';
import { EmployeeModule } from '@api/modules/employee/employee.module';

@Module({
  imports: [EmployeeModule],
  controllers: [],
  providers: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
