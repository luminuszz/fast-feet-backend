import { Abstract, Provider, Type } from '@nestjs/common'
import envVar, { nodeEnv } from '../../config/envVariables'

type AbstractType<T = unknown> = string | symbol | Type<T> | Abstract<T>

type state<T> = {
  development: Type<T>
  production: Type<T>
}

export function injectResolver(
  abstraction: AbstractType,
  { development, production }: state<unknown>
): Provider {
  const provide = abstraction

  switch (envVar().nodeEnv) {
    case nodeEnv.development:
      return { provide, useClass: development }

    case nodeEnv.production:
      return {
        provide,
        useClass: production,
      }

    default:
      return { provide, useClass: development }
  }
}
