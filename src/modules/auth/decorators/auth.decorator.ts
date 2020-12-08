import { CustomDecorator, SetMetadata } from '@nestjs/common'

export enum AuthType {
  jwt = 'jwt',
}

export const Auth = (authType: keyof typeof AuthType): CustomDecorator =>
  SetMetadata('auth', authType)
