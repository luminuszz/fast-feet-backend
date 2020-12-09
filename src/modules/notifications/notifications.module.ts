import { Module } from '@nestjs/common'
import { NotificationsService } from './services/notifications.service'
import { BullModule } from '@nestjs/bull'
import { queuesKeys } from './queues'
import { SendEmailConsumer } from './queues/sendEmail.queue'

@Module({
  imports: [
    BullModule.registerQueue({
      name: queuesKeys.sendEmail,
    }),
  ],
  providers: [NotificationsService, SendEmailConsumer],
  exports: [NotificationsService],
})
export class NotificationsModule {}
