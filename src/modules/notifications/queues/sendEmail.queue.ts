import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueProgress,
  OnQueueCompleted,
  OnQueueFailed,
} from '@nestjs/bull'
import { queuesKeys } from '.'
import { Job } from 'bull'
import { Injectable } from '@nestjs/common'
import { EmailProviderService } from 'src/shared/providers/email/email.service'

interface Delivery {
  name: string
  startOfData: string
}

export interface IRequest {
  email: string
  name: string
  delivery?: Delivery
}

@Processor(queuesKeys.sendEmail)
@Injectable()
export class SendEmailConsumer {
  constructor(private readonly emailProviderService: EmailProviderService) {}

  @Process()
  public async sendEmail(job: Job<IRequest>): Promise<void> {
    await this.emailProviderService.sendEmail({
      body: job.data.name,
      to: job.data.email,
    })
  }

  @OnQueueActive()
  private onActive(job: Job) {
    console.log(this.emailProviderService)
    console.log(`Processing job ${job.id} of type ${job.name}`)
  }

  @OnQueueProgress()
  private progress(job: Job, progress: number): void {
    console.log(`proceeding.... ${job.id}, number: ${progress}`)
  }

  @OnQueueCompleted()
  private completed(job: Job) {
    console.log(`completed job ${job.id}`)
  }

  @OnQueueFailed()
  private error(error: Error) {
    console.log(error.message)
  }
}
