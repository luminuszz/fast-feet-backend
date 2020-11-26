import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES_KEY_TOKEN } from '../decorators/role.decorator'

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
  }
}
