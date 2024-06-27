import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import AllowUnauthenticatedAccess from '@api/utils/allow-unauthenticated-access';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getEmployees() {
    return this.employeeService.getEmployees();
  }

  @Get(":id")
  async getEmployeeById(@Param() params: {id: string}) {
    return this.employeeService.getEmployeeById(params);
  }

  @Delete(":id")
  async deleteEmployee(@Param() params: {id: string}) {
    return this.employeeService.deleteEmployee(params);
  }
}
