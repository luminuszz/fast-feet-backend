import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ClassValidatorPipe } from './shared/pipes/classValidator.pipe'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { DeliveriesModule } from './modules/deliveries/deliveries.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { mongoConnection, pgConnection } from './config/connections'
import {
  configModule,
  eventEmitterConfig,
  gqlModuleConfig,
} from './config/modulesConfig'

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    TypeOrmModule.forRoot(mongoConnection),
    TypeOrmModule.forRoot(pgConnection),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot(gqlModuleConfig),
    EventEmitterModule.forRoot(eventEmitterConfig),
    UsersModule,
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
