import { Module } from '@nestjs/common';
import { PrismaModule } from 'apps/api-server/prisma/prisma.module';
import { EmployeeRepository } from './employee.repository';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';

@Module({
  imports: [PrismaModule],
  providers: [EmployeeRepository, EmployeeService, EmployeeResolver],
  exports: [EmployeeService],
})
export class EmployeeModule {}
