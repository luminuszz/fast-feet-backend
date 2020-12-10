import { SendEmailDTO } from './sendEmail.dto'

export abstract class IEmailProvider {
  public abstract sendEmail<T>(data: SendEmailDTO<T>): Promise<void>
}
