import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { APP_PIPE } from '@nestjs/core'
import { ClassValidatorPipe } from './shared/pipes/classValidator.pipe'
import { AuthModule } from './modules/auth/auth.module'
import envVariables from './config/envVariables'
import { ConfigModule } from '@nestjs/config'

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
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE, useClass: ClassValidatorPipe }],
})
export class AppModule {}
