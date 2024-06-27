import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/api-server/prisma/prisma.service';
import { UserSignIn } from '@api/types/employee';

type SignInData = {
  passwordHash: string;
  user: UserSignIn;
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByOfficialEmail(officialEmail: string): Promise<SignInData | undefined> {
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
    const { passwordHash, assignedRoles, ...rest } = user;
    const roles = assignedRoles.map((role) => role.role);
    const permissions = roles.reduce((acc: any, role) => {
      role.permissions.forEach((permission) => {
        const resource = permission.resource?.uri;
        acc[resource] = acc[resource] || [];
        acc[resource].push(permission.type);
      });
      return acc;
    }, {});
    const payload = {
      id: rest.id,
      officialEmail: rest.officialEmail,
      companyId: rest.companyId,
      permissions,
      firstName: rest.employeeRecord?.firstName,
      lastName: rest.employeeRecord?.lastName,
      middleName: rest.employeeRecord?.middleName,
    };
    return { passwordHash, user: payload } as any;
  }
}
