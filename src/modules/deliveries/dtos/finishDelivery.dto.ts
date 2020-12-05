import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'

@InputType()
export class FinishDeliveryDTO {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  deliveryId: string
}
