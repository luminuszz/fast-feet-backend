import { InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'

@InputType()
export class AcceptDeliveryDTO {
  @IsNotEmpty()
  @IsUUID()
  deliveryId: string

  @IsNotEmpty()
  @IsUUID()
  deliveryManId: string
}
