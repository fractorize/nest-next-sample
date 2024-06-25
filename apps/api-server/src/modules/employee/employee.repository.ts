import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/api-server/prisma/prisma.service';
import { Prisma, Employee } from '@prisma/client';
import { EmployeeRowItem, NewEmployee } from '@api/types/employee';

const saltOrRounds = 10;

@Injectable()
export class EmployeeRepository {
  constructor(private prisma: PrismaService) {}

  async createEmployee(params: { data: NewEmployee }): Promise<Employee> {
    const { data } = params;
    const { officialEmail, password, ...rest } = data;
    const userAccount = await this.prisma.userAccount.create({
      data: {
        officialEmail,
        passwordHash: await bcrypt.hash(password, saltOrRounds),
      },
    });
    return this.prisma.employee.create({
      data: {
        ...rest,
        userAccountId: userAccount.id,
      },
    });
  }

  async getEmployeeById(params: { id: string }): Promise<Employee | null> {
    const { id } = params;
    return this.prisma.employee.findUnique({ where: { id } });
  }

  async getEmployees(): Promise<EmployeeRowItem[]> {
    return this.prisma.employee.findMany({
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        dateOfBirth: true,
      },
    }) as Promise<EmployeeRowItem[]>;
  }

  async updateEmployee(params: {
    id: string;
    data: Prisma.EmployeeUpdateInput;
  }): Promise<Employee> {
    const { id, data } = params;
    console.log({ id, data });
    return this.prisma.employee.update({ where: { id }, data });
  }

  async deleteEmployee(params: { id: string }): Promise<Employee> {
    const { id } = params;
    return this.prisma.employee.delete({ where: { id } });
  }
}
