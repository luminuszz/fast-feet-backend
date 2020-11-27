import { CustomDecorator, SetMetadata, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { UserRole } from '../../users/entities/user.entity'

export const ROLES_KEY_TOKEN = 'roles'

export const Role = (
  role: keyof typeof UserRole,
  ctx: ExecutionContext
): CustomDecorator => {
  const user = GqlExecutionContext.create(ctx).getContext().req.user

  return SetMetadata(ROLES_KEY_TOKEN, { role: UserRole[role], user })
}
