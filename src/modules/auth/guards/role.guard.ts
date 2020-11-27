import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES_KEY_TOKEN } from '../decorators/role.decorator'

import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const currentRole = this.reflector.get<string>(
      ROLES_KEY_TOKEN,
      context.getHandler()
    )

    if (!currentRole) return true

    const ctx = GqlExecutionContext.create(context)

    console.log(ctx.getContext().req.user)

    return true

    //  return currentRole === user.role
  }
}
