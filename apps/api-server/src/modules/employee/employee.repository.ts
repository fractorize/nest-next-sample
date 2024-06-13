import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/api-server/prisma/prisma.service';
import { Prisma, Employee } from '@prisma/client';

@Injectable()
export class EmployeeRepository {
  constructor(private prisma: PrismaService) {}

  async createEmployee(params: {
    data: Prisma.EmployeeCreateInput;
  }): Promise<Employee> {
    const { data } = params;
    return this.prisma.employee.create({ data });
  }

  async getEmployeeById(params: { id: string }): Promise<Employee | null> {
    const { id } = params;
    return this.prisma.employee.findUnique({ where: { id } });
  }

  async getEmployees(): Promise<Employee[]> {
    return this.prisma.employee.findMany();
  }

  async updateEmployee(params: {
    id: string;
    data: Prisma.EmployeeUpdateInput;
  }): Promise<Employee> {
    const { id, data } = params;
    return this.prisma.employee.update({ where: { id }, data });
  }

  async deleteEmployee(params: { id: string }): Promise<Employee> {
    const { id } = params;
    return this.prisma.employee.delete({ where: { id } });
  }
}
