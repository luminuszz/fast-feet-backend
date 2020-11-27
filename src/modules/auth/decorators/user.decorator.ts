import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { PayloadDTO } from '../dtos/payload.dto'

type Values = {
  req: { user: PayloadDTO }
}

export const UserRequest = createParamDecorator(
  (_, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext<Values>().req

    return user
  }
)
