import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { AuthType } from '../decorators/auth.decorator'

type canActiveReturn = boolean | Promise<boolean> | Observable<boolean>

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  public getRequest(context: ExecutionContext): Request {
    const gqlContext = GqlExecutionContext.create(context)
    return gqlContext.getContext<{ req: Request }>().req
  }

  public canActivate(contenxt: GqlExecutionContext): canActiveReturn {
    const authType = this.reflector.get<string>('auth', contenxt.getHandler())

    if (!AuthType[authType]) {
      return true
    }

    return super.canActivate(contenxt)
  }
}
