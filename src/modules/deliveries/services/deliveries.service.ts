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
import { UploadService } from 'src/shared/providers/upload/upload.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { IsNull } from 'typeorm'

interface IFinishDeliveryParams {
  deliveryId: string
  deliveryManId: string
}
interface ICancelDeliveryParams {
  deliveryId: string
  deliveryManId: string
}

@Injectable()
export class DeliveriesService {
  private currentDate: Date

  constructor(
    private readonly deliversRepository: DeliveriesRepository,
    private readonly usersService: UsersService,
    private readonly uploadService: UploadService,
    private readonly eventEmitter: EventEmitter2
  ) {
    this.currentDate = new Date()
  }

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

  public async getDeliveriesForOneUser(userId: string): Promise<Deliveries[]> {
    const deliveries = await this.deliversRepository.find({
      where: { deliveryman: { id: userId }, createdAt: IsNull() },
    })

    return deliveries
  }

  public async acceptDelivery({
    deliveryId,
    deliveryManId,
  }: AcceptDeliveryDTO): Promise<Deliveries> {
    if (getHours(this.currentDate) < 8 || getHours(this.currentDate) > 12) {
      throw new UnauthorizedException(
        'You can only accept delivery from 8am to 12pm'
      )
    }

    const currentDeliveryMain = await this.usersService.findOneUser({
      column: 'id',
      value: deliveryManId,
    })

    const currentDelivery = await this.deliversRepository.findOne({
      where: { id: deliveryId },
    })

    const isHaveDeliveryInDay = await this.usersService.verifyNumberOfDeliveries(
      currentDeliveryMain.id
    )

    if (!isHaveDeliveryInDay) {
      throw new UnauthorizedException("You already hit the day's delivery mate")
    }

    if (!currentDelivery) {
      throw new BadRequestException('delivery not found')
    }

    if (!currentDeliveryMain) {
      throw new BadRequestException('user not found')
    }

    currentDelivery.deliveryman = currentDeliveryMain
    currentDelivery.startDate = this.currentDate

    await this.deliversRepository.save(currentDelivery)

    return currentDelivery
  }

  public async cancelDelivery(deliveryId: string): Promise<Deliveries> {
    const foundDelivery = await this.deliversRepository.findOne(deliveryId)

    if (!foundDelivery) {
      throw new BadRequestException('Delivery not found')
    }

    foundDelivery.canceledAt = this.currentDate

    await this.deliversRepository.save(foundDelivery)

    return foundDelivery
  }

  public async finishDelivery({
    deliveryId,
    deliveryManId,
  }: IFinishDeliveryParams): Promise<Deliveries> {
    const foundedDelivery = await this.deliversRepository.findOne(deliveryId)

    const foundedDeliveryMain = await this.usersService.findOneUser({
      column: 'id',
      value: deliveryManId,
    })

    if (!foundedDelivery || !foundedDeliveryMain) {
      throw new BadRequestException('credentials not found')
    }

    if (!foundedDelivery.startDate) {
      throw new UnauthorizedException('This delivery should to accept first')
    }

    await this.usersService.incrementNumberOfDeliveries(foundedDeliveryMain.id)

    foundedDelivery.endDate = new Date()

    await this.deliversRepository.save(foundedDelivery)

    this.eventEmitter.emit('delivery.finish', { user: foundedDeliveryMain })

    return foundedDelivery
  }

  // Upload

  public async uploadSignatureImage(
    fileName: string,
    deliveryId: string
  ): Promise<Deliveries> {
    const foundedDelivery = await this.deliversRepository.findOne(deliveryId)

    if (!foundedDelivery) {
      throw new BadRequestException('Delivery, not found')
    }

    const filePath = await this.uploadService.saveFile(fileName)

    foundedDelivery.signatureId = filePath

    await this.deliversRepository.save(foundedDelivery)

    return foundedDelivery
  }
}
