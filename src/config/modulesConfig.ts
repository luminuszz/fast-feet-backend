import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces'
import { EventEmitterModuleOptions } from '@nestjs/event-emitter/dist/interfaces'
import { GqlModuleOptions } from '@nestjs/graphql'
import { formatterErrors } from 'src/shared/errors/exeption.filter'
import envVariables from './envVariables'

export const eventEmitterConfig: EventEmitterModuleOptions = {
  maxListeners: 10,
  wildcard: false,
  delimiter: '.',
  removeListener: false,
  verboseMemoryLeak: false,
  ignoreErrors: false,
}

export const gqlModuleConfig: GqlModuleOptions = {
  autoSchemaFile: true,
  playground: true,
  context: ({ req }) => ({ req }),
  formatError: formatterErrors,
}

export const configModule: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
  load: [envVariables],
}
