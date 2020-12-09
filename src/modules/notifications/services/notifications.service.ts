import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { queuesKeys } from '../queues'

@Injectable()
export class NotificationsService {
  constructor(
    @InjectQueue(queuesKeys.sendEmail)
    private readonly sendEmailQueue: Queue
  ) {}

  public async sendEmailNotification(): Promise<void> {
    await this.sendEmailQueue.add({
      ok: 'value',
    })
  }
}
