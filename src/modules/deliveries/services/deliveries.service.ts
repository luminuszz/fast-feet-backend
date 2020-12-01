import { Injectable } from '@nestjs/common'
import { AcceptDeliveryDTO } from '../dtos/acceptDelivery.dto'
import { createDeliveryInputDTO } from '../dtos/createDeliver.dto'
import { Deliveries } from '../entities/deliveries.entity'
import { DeliveriesRepository } from '../repositories/deliveries.repository'

@Injectable()
export class DeliveriesService {
  constructor(private readonly deliversRepository: DeliveriesRepository) {}

  public async createDelivery(
    data: createDeliveryInputDTO
  ): Promise<Deliveries> {
    const newDelivery = await this.deliversRepository.createAndSave(data)

    return newDelivery
  }

  public async getAllDeliveries(): Promise<Deliveries[]> {
    const deliveries = await this.deliversRepository.find()

    return deliveries
  }

  public async acceptDelivery({
    deliveryId,
    deliveryManId,
  }: AcceptDeliveryDTO): Promise<void> {}
}
