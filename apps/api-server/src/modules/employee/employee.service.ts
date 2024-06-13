import { Injectable } from '@nestjs/common';
import { Prisma, Employee } from '@prisma/client';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async createEmployee(params: {
    data: Prisma.EmployeeCreateInput;
  }): Promise<Employee> {
    return this.employeeRepository.createEmployee(params);
  }

  async getEmployeeById(params: { id: string }): Promise<Employee | null> {
    return this.employeeRepository.getEmployeeById(params);
  }

  async getEmployees(): Promise<Employee[]> {
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
