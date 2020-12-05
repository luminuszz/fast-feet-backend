import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ClassValidatorPipe } from './shared/pipes/classValidator.pipe'
import { AuthModule } from './modules/auth/auth.module'
import envVariables from './config/envVariables'
import { ConfigModule } from '@nestjs/config'
import { DeliveriesModule } from './modules/deliveries/deliveries.module'
import { formatterErrors } from './shared/errors/exeption.filter'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [envVariables],
    }),
    UsersModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      context: ({ req }) => ({ req }),
      formatError: formatterErrors,
    }),

    AuthModule,
    DeliveriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useClass: ClassValidatorPipe },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
