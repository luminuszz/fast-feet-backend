import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/modules/auth/guards/gqlAuth.guard'
import { DeliveriesService } from '../deliveries.service'
import { createDeliveryInputDTO } from '../dtos/createDeliver.dto'
import { Deliveries } from '../entities/deliveries.entity'

@Resolver(() => Deliveries)
@UseGuards(GqlAuthGuard)
export class DeliveriesResolver {
  constructor(private readonly deliveryService: DeliveriesService) {}

  @Mutation(() => Deliveries)
  public async createDelivery(
    @Args('createDelivery') data: createDeliveryInputDTO
  ): Promise<Deliveries> {
    const newDelivery = await this.deliveryService.createDelivery(data)

    return newDelivery
  }

  @Query(() => [Deliveries])
  public async getAllDelivery(): Promise<Deliveries[]> {
    const deliveries = await this.deliveryService.getAllDeliveries()

    return deliveries
  }
}
