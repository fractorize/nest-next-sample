import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltOrRounds = 10;

async function main() {
  const gendersFile = fs.readFileSync('./genders.yml', 'utf8');
  const genders = yaml.load(gendersFile) as any;
  console.log(genders);
  // Create or update genders
  for (const gender of genders) {
    await prisma.gender.upsert({
      where: { id: gender.id },
      update: gender,
      create: gender,
    });
  }

  const fileContents = fs.readFileSync('company1.yml', 'utf8');
  const company1 = yaml.load(fileContents) as any;
  const companies = [company1];
  // Create or update companies
  for (const company of companies) {
    const data = {
      id: company.id,
      name: company.name,
    };
    await prisma.company.upsert({
      where: { id: company.id },
      update: data,
      create: data,
    });

    // Create or update departments
    for (const department of company.departments) {
      await prisma.department.upsert({
        where: { id: department.id },
        update: department,
        create: department,
      });
    }

    // Create or update designations
    for (const { departmentId, ...designation } of company1.designations) {
      const data = {
        ...designation,
        department: {
          connect: { id: departmentId },
        },
      };
      const depts = await prisma.designation.upsert({
        where: { id: designation.id },
        update: data,
        create: data,
      });
      console.log(depts);
    }

    // Create or update roles
    for (const role of company1.roles) {
      await prisma.role.upsert({
        where: { id: role.id },
        update: role,
        create: role,
      });
    }

    // Create or update resources
    for (const resource of company1.resources) {
      await prisma.resource.upsert({
        where: { id: resource.id },
        update: resource,
        create: resource,
      });
    }

    // Create or update permissions
    for (const { roles, ...permission } of company1.permissions) {
      const data = {
        ...permission,
        roles: {
          connect: roles.map((r: any) => ({ id: r })),
        },
      };
      await prisma.permission.upsert({
        where: { id: permission.id },
        update: data,
        create: data,
      });
    }

    // Create or update userAccounts
    for (const {
      password,
      companyId,
      roles,
      ...userAccount
    } of company1.userAccounts) {
      const data = {
        ...userAccount,
        passwordHash: await bcrypt.hash(password, saltOrRounds),
        company: {
          connect: { id: company.id },
        },
      };
      await prisma.user.upsert({
        where: { id: userAccount.id },
        update: data,
        create: data,
      });
      for (const role of roles) {
        const userRole = {
          user: { connect: { id: userAccount.id } },
          role: { connect: { id: role.roleId } },
          startDate: role.startDate,
        };
        await prisma.userRole.upsert({
          where: {
            userId_roleId: { userId: userAccount.id, roleId: role.roleId },
          },
          update: userRole,
          create: userRole,
        });
      }
    }

    // Create or update employees
    for (const {
      roles,
      genderId,
      userAccountId,
      designations,
      departments,
      ...employee
    } of company1.employees) {
      const data = {
        ...employee,
        userAccount: {
          connect: { id: userAccountId },
        },
        gender: {
          connect: { id: genderId },
        },
      };
      await prisma.employee.upsert({
        where: { id: employee.id },
        update: data,
        create: data,
      });
      for (const designation of designations) {
        const employeeDesignation = {
          employee: { connect: { id: employee.id } },
          designation: { connect: { id: designation.designationId } },
          startDate: designation.startDate,
        };
        await prisma.employeeDesignation.upsert({
          where: {
            employeeId_designationId: {
              employeeId: employee.id,
              designationId: designation.designationId,
            },
          },
          update: employeeDesignation,
          create: employeeDesignation,
        });
      }
      for (const department of departments) {
        const employeeDepartment = {
          employee: { connect: { id: employee.id } },
          department: { connect: { id: department.departmentId } },
          startDate: department.startDate,
        };
        await prisma.employeeDepartment.upsert({
          where: {
            employeeId_departmentId: {
              employeeId: employee.id,
              departmentId: department.departmentId,
            },
          },
          update: employeeDepartment,
          create: employeeDepartment,
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
