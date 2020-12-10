import { Module } from '@nestjs/common'
import { EmailProviderService } from './email.service'
import { EmailProvider } from './implementations'

@Module({
  providers: [EmailProviderService, EmailProvider],
  exports: [EmailProviderService],
})
export class EmailProviderModule {}
