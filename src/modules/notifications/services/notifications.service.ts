import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { queuesKeys } from '../queues'
import { IRequest } from '../queues/sendEmail.queue'

@Injectable()
export class NotificationsService {
  constructor(
    @InjectQueue(queuesKeys.sendEmail)
    private readonly sendEmailQueue: Queue<IRequest>
  ) {}

  public async sendEmailNotification(data: IRequest): Promise<void> {
    this.sendEmailQueue.add({ email: data.email, name: data.name })
  }
}
