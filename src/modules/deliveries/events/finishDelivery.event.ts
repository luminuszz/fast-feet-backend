import { OnEvent } from '@nestjs/event-emitter'
import { User } from 'src/modules/users/entities/user.entity'
import { UsersService } from 'src/modules/users/services/users.service'

interface IFinishEvent {
  user: User
}

export class ListenerDeliveryEvent {
  constructor(private readonly usersService: UsersService) {}

  @OnEvent('delivery.finish', { async: true })
  public async execute(payload: IFinishEvent): Promise<void> {}
}
