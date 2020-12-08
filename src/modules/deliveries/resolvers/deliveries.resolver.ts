import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/modules/auth/guards/gqlAuth.guard'
import { DeliveriesService } from '../services/deliveries.service'
import { createDeliveryInputDTO } from '../dtos/createDeliver.dto'
import { Deliveries } from '../entities/deliveries.entity'
import { UserRequest } from 'src/modules/auth/decorators/user.decorator'
import { User } from 'src/modules/users/entities/user.entity'
import { Auth } from 'src/modules/auth/decorators/auth.decorator'

@Resolver(() => Deliveries)
@UseGuards(GqlAuthGuard)
export class DeliveriesResolver {
  constructor(private readonly deliveryService: DeliveriesService) {}

  @Auth('jwt')
  @Mutation(() => Deliveries)
  public async createDelivery(
    @Args('createDelivery') data: createDeliveryInputDTO
  ): Promise<Deliveries> {
    const newDelivery = await this.deliveryService.createDelivery(data)

    return newDelivery
  }

  @Auth('jwt')
  @Query(() => [Deliveries])
  public async getAllDelivery(): Promise<Deliveries[]> {
    const deliveries = await this.deliveryService.getAllDeliveries()

    return deliveries
  }

  @Auth('jwt')
  @Query(() => [Deliveries])
  public async getAllDeliveryForOneUser(
    @UserRequest('id') userId: string
  ): Promise<Deliveries[]> {
    const deliveries = await this.deliveryService.getDeliveriesForOneUser(
      userId
    )

    return deliveries
  }

  @Mutation(() => Deliveries)
  public async acceptDelivery(
    @Args('deliveryId', new ParseUUIDPipe()) deliveryId: string,
    @UserRequest() user: User
  ): Promise<Deliveries> {
    const accept = await this.deliveryService.acceptDelivery({
      deliveryManId: user.id,
      deliveryId,
    })

    return accept
  }

  @Mutation(() => Deliveries)
  public async cancelDelivery(
    @Args('deliveryId', ParseUUIDPipe) deliveryId: string
  ): Promise<Deliveries> {
    const CancelledDelivery = await this.deliveryService.cancelDelivery(
      deliveryId
    )

    return CancelledDelivery
  }

  @Mutation(() => Deliveries)
  public async finishDelivery(
    @Args('deliveryId', ParseUUIDPipe) deliveryId: string,
    @UserRequest('id')
    id: string
  ): Promise<Deliveries> {
    const response = await this.deliveryService.finishDelivery({
      deliveryId,
      deliveryManId: id,
    })

    return response
  }
}
