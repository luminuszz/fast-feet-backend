import { Module } from '@nestjs/common'
import { UsersService } from './services/users.service'

import { UsersResolver } from './resolvers/users.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from './repositories/usersRepository'
import { HashModuleProvider } from '../../shared/providers/hash/hash.module'
import { UserSchema } from './schemas/user.schema'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    TypeOrmModule.forFeature([UserSchema], 'mongo'),
    HashModuleProvider,
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
