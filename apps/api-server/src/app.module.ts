import configuration from '../config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config'; //Should always be the first import
import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { EmployeeModule } from './modules/employee/employee.module';
import { EmployeeModule } from './graphql/employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user/user.module';
import { Enhancer, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RootQuery } from './root.query';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env.local'],
      load: [configuration],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // installSubscriptionHandlers: true,
      // autoSchemaFile: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
    }),
    // GraphQLModule.forRootAsync<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   // useFactory: (config: ConfigService) => {
    //   //   return {
    //   //     debug: config.get('GRAPHQL_DEBUG') === 'true',
    //   //     playground: config.get('GRAPHQL_PLAYGROUND') === 'true',
    //   //     autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
    //   //     sortSchema: true,
    //   //     fieldResolverEnhancers: ['interceptors'] as Enhancer[],
    //   //     autoTransformHttpErrors: true,
    //   //     context: (context: any) => context,
    //   //   };
    //   // },
    //   // inject: [ConfigService],
    // }),
    EmployeeModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, RootQuery],
})
export class AppModule {}
