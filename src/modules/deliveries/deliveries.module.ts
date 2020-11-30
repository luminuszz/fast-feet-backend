import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DeliveriesService } from './deliveries.service'
import { DeliveriesRepository } from './repositories/deliveries.repository'
import { DeliveriesResolver } from './resolvers/deliveries.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([DeliveriesRepository])],
  providers: [DeliveriesService, DeliveriesResolver],
})
export class DeliveriesModule {}
