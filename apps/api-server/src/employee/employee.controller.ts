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
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { NewEmployee } from '@api/types/employee';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getEmployees() {
    return this.employeeService.getEmployees();
  }

  @Get(':id')
  async getEmployeeById(@Param() params: { id: string }) {
    return this.employeeService.getEmployeeById(params);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async createEmployee(@Body() data: NewEmployee) {
    return this.employeeService.createEmployee({
      data: {
        ...data,
        companyId: 'company1',
        password: 'pwd',
      },
    });
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @UseInterceptors(NoFilesInterceptor())
  async updateEmployee(
    @Param() params: { id: string },
    @Body()
    data: {
      firstName: string;
      middleName: string;
      lastName: string;
      dateOfBirth: string;
    },
  ) {
    return this.employeeService.updateEmployee({ id: params.id, data });
  }

  @Delete(':id')
  async deleteEmployee(@Param() params: { id: string }) {
    return this.employeeService.deleteEmployee(params);
  }
}
