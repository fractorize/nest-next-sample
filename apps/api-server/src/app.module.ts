import configuration from "../config/configuration";
import { ConfigModule } from "@nestjs/config"; //Should always be the first import
import { join } from "path";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { RootQuery } from "./root.query";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AuthController } from "./auth/auth.controller";
import { AuthGuard } from "./auth/auth.guard";
import { AccessModule } from "./access/access.module";
import { AccessGuard } from "./access/access.guard";
// import { EmployeeModule } from './graphql/employee/employee.module';
import { EmployeeModule } from "./employee/employee.module";
import { EmployeeController } from "./employee/employee.controller";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksService } from "./scheduled-tasks/tasks.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["../.env.local"],
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/graphql/schema.gql"),
      sortSchema: true,
    }),
    AuthModule,
    AccessModule,
    EmployeeModule,
  ],
  controllers: [AppController, AuthController, EmployeeController],
  providers: [
    AppService,
    RootQuery,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
    TasksService,
  ],
})
export class AppModule {}
