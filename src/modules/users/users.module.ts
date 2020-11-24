import { Module } from '@nestjs/common'
import { UsersService } from './services/users.service'

import { UsersResolver } from './resolvers/users.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from './repositories/usersRepository'

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
