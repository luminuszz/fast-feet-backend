import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DeliveriesService } from './services/deliveries.service'
import { DeliveriesRepository } from './repositories/deliveries.repository'
import { DeliveriesResolver } from './resolvers/deliveries.resolver'
import { UsersModule } from '../users/users.module'
import { UploadModule } from 'src/shared/providers/upload/upload.module'
import { DeliveryController } from './controllers/deliveries.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveriesRepository]),
    UsersModule,
    UploadModule,
  ],
  providers: [DeliveriesService, DeliveriesResolver],
  controllers: [DeliveryController],
})
export class DeliveriesModule {}
