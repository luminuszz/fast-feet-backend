import { Module } from '@nestjs/common'
import { UsersService } from './services/users.service'

import { UsersResolver } from './resolvers/users.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from './repositories/usersRepository'
import { HashModuleProvider } from '../../shared/providers/hash/hash.module'
import { APP_GUARD } from '@nestjs/core'
import { RoleGuard } from '../auth/guards/role.guard'

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), HashModuleProvider],
  providers: [
    UsersService,
    UsersResolver,

    { provide: APP_GUARD, useClass: RoleGuard },
  ],
  exports: [UsersService],
})
export class UsersModule {}
