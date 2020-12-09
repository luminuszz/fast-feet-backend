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
import { ScheduleModule } from '@nestjs/schedule'
import {
  configModule,
  eventEmitterConfig,
  gqlModuleConfig,
  bullModuleConfig,
} from './config/modulesConfig'
import { NotificationsModule } from './modules/notifications/notifications.module'
import { BullModule } from '@nestjs/bull'

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    TypeOrmModule.forRoot(mongoConnection),
    TypeOrmModule.forRoot(pgConnection),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot(gqlModuleConfig),
    EventEmitterModule.forRoot(eventEmitterConfig),
    BullModule.forRoot(bullModuleConfig),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    DeliveriesModule,
    NotificationsModule,
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
