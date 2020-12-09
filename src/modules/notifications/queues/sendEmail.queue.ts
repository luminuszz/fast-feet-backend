import { Processor, Process } from '@nestjs/bull'
import { queuesKeys } from '.'
import { Job } from 'bull'

@Processor(queuesKeys.sendEmail)
export class SendEmailConsumer {
  @Process()
  public async sendEmail(data: Job<string>): Promise<void> {
    setTimeout(() => {
      console.log('email envadi', data.data)
    }, 1000)
  }
}
