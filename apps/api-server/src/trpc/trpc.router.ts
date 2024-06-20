import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from '@api/trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { EmployeeService } from '@api/modules/employee/employee.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly employeeService: EmployeeService,
  ) {}

  appRouter = this.trpc.router({
    employees: this.trpc.procedure.query(async () => {
      const employees = await this.employeeService.getEmployees();
      return employees;
    }),

    employee: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .query(({ input }) => {
        const { id } = input;
        return this.employeeService.getEmployeeById({ id });
      }),

    newEmployee: this.trpc.procedure
      .input(
        z.object({
          data: z.object({
            firstName: z.string(),
            middleName: z.string().optional(),
            lastName: z.string(),
            dateOfBirth: z.string().optional(),
          }),
        }),
      )
      .mutation(async ({ input }) => {
        const { data } = input;
        const resp = await this.employeeService.createEmployee({ data });
        return resp;
      }),

    updateEmployee: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
          data: z.object({
            firstName: z.string(),
            middleName: z.string().optional(),
            lastName: z.string(),
            // dateOfBirth: z.string().optional(),
          }),
        }),
      )
      .mutation(async ({ input }) => {
        const { id, data } = input;
        console.log({ id, data });
        const resp = await this.employeeService.updateEmployee({ id, data });
        return resp;
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
