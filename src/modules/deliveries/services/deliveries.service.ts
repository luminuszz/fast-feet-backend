import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from 'src/modules/users/services/users.service'
import { AcceptDeliveryDTO } from '../dtos/acceptDelivery.dto'
import { createDeliveryInputDTO } from '../dtos/createDeliver.dto'
import { Deliveries } from '../entities/deliveries.entity'
import { DeliveriesRepository } from '../repositories/deliveries.repository'
import { getHours } from 'date-fns'

@Injectable()
export class DeliveriesService {
  constructor(
    private readonly deliversRepository: DeliveriesRepository,
    private readonly usersService: UsersService
  ) {}

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
  }: AcceptDeliveryDTO): Promise<Deliveries> {
    const currentDate = new Date()

    console.log(currentDate)

    if (getHours(currentDate) < 8 || getHours(currentDate) > 12) {
      throw new UnauthorizedException(
        'You can only accept delivery from 8am to 12pm'
      )
    }

    const currentDelivery = await this.deliversRepository.findOne({
      where: { id: deliveryId },
    })

    if (!currentDelivery) {
      throw new BadRequestException('delivery not found')
    }

    const currentDeliveryMain = await this.usersService.findOneUser({
      column: 'id',
      value: deliveryManId,
    })

    if (!currentDeliveryMain) {
      throw new BadRequestException('user not found')
    }

    currentDelivery.deliveryman = currentDeliveryMain
    currentDelivery.startDate = currentDate

    await this.deliversRepository.save(currentDelivery)

    return currentDelivery
  }
}
