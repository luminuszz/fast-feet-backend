import { CustomDecorator, SetMetadata } from '@nestjs/common'
import { UserRole } from '../../users/entities/user.entity'

export const ROLES_KEY_TOKEN = 'roles'

export const Role = (role: keyof typeof UserRole): CustomDecorator =>
  SetMetadata(ROLES_KEY_TOKEN, UserRole[role])
