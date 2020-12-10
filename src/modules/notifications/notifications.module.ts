import { Module } from '@nestjs/common'
import { NotificationsService } from './services/notifications.service'
import { BullModule } from '@nestjs/bull'
import { queuesKeys } from './queues'
import { SendEmailConsumer } from './queues/sendEmail.queue'
import { EmailProviderModule } from 'src/shared/providers/email/email.module'

@Module({
  imports: [
    EmailProviderModule,
    BullModule.registerQueue({
      name: queuesKeys.sendEmail,
    }),
  ],
  providers: [NotificationsService, SendEmailConsumer],
  exports: [NotificationsService],
})
export class NotificationsModule {}
