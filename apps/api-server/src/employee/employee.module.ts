import { Module } from '@nestjs/common';
import { PrismaModule } from 'apps/api-server/prisma/prisma.module';
import { EmployeeRepository } from './employee.repository';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { QueueModule } from '@api/queues/queue.module';

@Module({
  imports: [PrismaModule, QueueModule],
  providers: [EmployeeRepository, EmployeeService],
  exports: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
