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
    const { officialEmail, password, companyId, ...rest } = data;
    if (!companyId) {
      throw new Error('Company ID is required');
    }
    const userAccount = await this.prisma.user.create({
      data: {
        officialEmail,
        passwordHash: await bcrypt.hash(password, saltOrRounds),
        company: {
          connect: { id: companyId },
        },
      },
    });
    if (!userAccount?.id) throw new Error('User account not created');
    return this.prisma.employee.create({
      data: {
        ...rest,
        company: {
          connect: { id: companyId },
        },
        userAccount: {
          connect: { id: userAccount.id },
        },
      },
    });
  }

  async getEmployeeById(params: { id: string }): Promise<Employee | null> {
    const { id } = params;
    return this.prisma.employee.findUnique({ where: { id } });
  }

  async getEmployees(): Promise<EmployeeRowItem[]> {
    return this.prisma.employee.findMany({
      where: {
        isDeleted: false,
      },
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
    return this.prisma.employee.update({ where: { id }, data });
  }

  async deleteEmployee(params: { id: string }): Promise<Employee> {
    const { id } = params;
    return this.prisma.employee.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }
}
