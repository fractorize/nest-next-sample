import { Injectable } from '@nestjs/common';
import { Prisma, Employee } from '@prisma/client';
import { EmployeeRepository } from './employee.repository';
import { EmployeeRowItem, NewEmployee } from '@api/types/employee';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async createEmployee(params: {
    data: NewEmployee;
  }): Promise<Employee> {
    return this.employeeRepository.createEmployee(params);
  }

  async getEmployeeById(params: { id: string }): Promise<Employee | null> {
    return this.employeeRepository.getEmployeeById(params);
  }

  async getEmployees(): Promise<EmployeeRowItem[]> {
    return this.employeeRepository.getEmployees();
  }

  async updateEmployee(params: {
    id: string;
    data: Prisma.EmployeeUpdateInput;
  }): Promise<Employee> {
    return this.employeeRepository.updateEmployee(params);
  }

  async deleteEmployee(params: { id: string }): Promise<Employee> {
    return this.employeeRepository.deleteEmployee(params);
  }
}
