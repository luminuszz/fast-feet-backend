import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY_TOKEN } from '../decorators/role.decorator'

import { GqlExecutionContext } from '@nestjs/graphql'
import { UsersService } from 'src/modules/users/services/users.service'
import { UserRole } from 'src/modules/users/entities/user.entity'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)

    const currentRole = this.reflector.get<string>(
      ROLES_KEY_TOKEN,
      ctx.getHandler()
    )

    const user = ctx.getContext().req.user

    console.log('role', currentRole)

    if (!currentRole) return true

    console.log(ctx.getContext().req.user)

    const foundedUser = await this.usersService.findOneUser({
      column: 'id',
      value: user.id,
    })

    if (foundedUser.role !== UserRole[currentRole]) {
      throw new UnauthorizedException('user not authorized')
    }

    return true
  }
}
