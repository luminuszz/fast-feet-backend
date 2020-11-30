import { Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Deliveries } from '../entities/deliveries.entity'

@Injectable()
@EntityRepository(Deliveries)
export class DeliveriesRepository extends Repository<Deliveries> {
  public async createAndSave<T>(data: T): Promise<Deliveries> {
    const newDelivery = this.create(data)

    await this.save(newDelivery)

    return newDelivery
  }
}
