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
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        const { name } = input;
        return {
          greeting: `Hello ${name ? name : `Bilbo`}`,
        };
      }),

    employees: this.trpc.procedure.query(() => {
      return this.employeeService.getEmployees();
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
