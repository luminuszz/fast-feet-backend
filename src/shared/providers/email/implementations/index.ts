import { injectResolver } from 'src/shared/utils/injectResolver'
import { EtherialEmailProvider } from './etherial.provider'
import { IEmailProvider } from '../dtos/IEmailProvider'

export const EmailProvider = injectResolver(IEmailProvider, {
  development: EtherialEmailProvider,
  production: EtherialEmailProvider,
})
