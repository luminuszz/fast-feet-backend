import { Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Deliveries } from '../../entities/deliveries.entity'

interface timeStamp {
  createdAt: Date
  UpdatedAt: Date
}

@Injectable()
export class DeliveriesRepository {
  private delivers: Deliveries[]

  constructor() {
    this.delivers = []
  }

  private createTimeStamp(): timeStamp {
    const data: timeStamp = {
      UpdatedAt: new Date(),
      createdAt: new Date(),
    }

    return data
  }

  public async createAndSave<T>(data: T): Promise<Deliveries> {
    const delivery = new Deliveries()

    const { UpdatedAt, createdAt } = this.createTimeStamp()

    delivery.productName = 'sandailia princesas'
    delivery.address = 'rua do teste 123'
    delivery.postalCode = '45646544'
    delivery.city = 'Salvador'
    delivery.state = 'bahia'
    delivery.neighborhood = 'enfrente a rua do cego'
    delivery.createdAt = createdAt
    delivery.updatedAt = UpdatedAt

    return delivery
  }
}
