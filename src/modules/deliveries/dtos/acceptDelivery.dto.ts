import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'

@InputType()
export class AcceptDeliveryDTO {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  deliveryId: string

  @IsNotEmpty()
  @IsUUID()
  @Field()
  deliveryManId: string
}
