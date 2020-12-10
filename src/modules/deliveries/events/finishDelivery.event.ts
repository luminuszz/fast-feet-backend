import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { UsersService } from 'src/modules/users/services/users.service'

interface IFinishEvent {
  id: string
}

export enum deliveryEventKey {
  finish = 'delivery.finish',
}

@Injectable()
export class ListenerDeliveryEvent {
  constructor(private readonly usersService: UsersService) {}

  @OnEvent('delivery.finish', { async: true })
  public async execute(payload: IFinishEvent): Promise<void> {
    console.log(
      'summon event -> ',
      deliveryEventKey.finish,
      `userId -> ${payload.id}`
    )
    await this.usersService.incrementNumberOfDeliveries(payload.id)
  }
}
