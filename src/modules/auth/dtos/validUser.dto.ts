import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, Length } from 'class-validator'

@InputType()
export class ValidUserDTO {
  @IsNotEmpty()
  @IsString()
  @Field()
  password: string

  @IsNotEmpty()
  @Length(11, 11)
  @Field()
  cpf: string
}
