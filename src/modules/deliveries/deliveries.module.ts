import { Module } from '@nestjs/common'
import { DeliveriesService } from './deliveries.service'

@Module({
  providers: [DeliveriesService],
})
export class DeliveriesModule {}
