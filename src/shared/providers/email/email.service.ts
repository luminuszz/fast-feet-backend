import { Injectable } from '@nestjs/common'
import { IEmailProvider } from './dtos/IEmailProvider'
import { SendEmailDTO } from './dtos/sendEmail.dto'

@Injectable()
export class EmailProviderService {
  constructor(private readonly emailProvider: IEmailProvider) {}

  public async sendEmail(data: SendEmailDTO<string>): Promise<void> {
    await this.emailProvider.sendEmail(data)
  }
}
