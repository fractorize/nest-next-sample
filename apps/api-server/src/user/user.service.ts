import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/api-server/prisma/prisma.service';
import { UserSignIn } from '@api/types/employee';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(officialEmail: string): Promise<UserSignIn | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { officialEmail },
      select: {
        id: true,
        companyId: true,
        officialEmail: true,
        passwordHash: true,
        assignedRoles: {
          select: {
            role: {
              select: {
                name: true,
                permissions: {
                  select: {
                    type: true,
                    resource: {
                      select: {
                        uri: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        employeeRecord: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
      },
    });
    if (!user) {
      return undefined;
    }
    const { assignedRoles, ...rest } = user;
    const roles = assignedRoles.map((role) => role.role);
    console.log(roles);
    return {
      ...rest,
      roles,
    } as UserSignIn;
  }
}
