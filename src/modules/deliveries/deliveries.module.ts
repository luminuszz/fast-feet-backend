import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DeliveriesService } from './services/deliveries.service'
import { DeliveriesRepository } from './repositories/deliveries.repository'
import { DeliveriesResolver } from './resolvers/deliveries.resolver'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([DeliveriesRepository]), UsersModule],
  providers: [DeliveriesService, DeliveriesResolver],
})
export class DeliveriesModule {}
