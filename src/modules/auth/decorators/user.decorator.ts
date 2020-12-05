import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from 'src/modules/users/entities/user.entity'
import { PayloadDTO } from '../dtos/payload.dto'

type Values = {
  req: { user: PayloadDTO }
}

export const UserRequest = createParamDecorator(
  (value: keyof User, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext<Values>().req

    if (value) {
      return user[value]
    }

    return user
  }
)
