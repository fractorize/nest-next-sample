import { Module } from '@nestjs/common';
import { PrismaModule } from 'apps/api-server/prisma/prisma.module';
import { EmployeeRepository } from './employee.repository';
import { EmployeeService } from './employee.service';

@Module({
  imports: [PrismaModule],
  providers: [EmployeeRepository, EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
