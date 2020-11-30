import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class createDeliveryInputDTO {
  @IsString()
  @Field({ nullable: false })
  productName: string

  @IsString()
  @Field({ nullable: false })
  address: string

  @IsString()
  @Field({ nullable: false })
  postalCode: string

  @IsString()
  @Field({ nullable: false })
  neighborhood: string

  @IsString()
  @Field({ nullable: false })
  city: string

  @IsString()
  @Field({ nullable: false })
  state: string
}
