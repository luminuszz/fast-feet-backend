import { Field, InputType } from '@nestjs/graphql'
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  IsBoolean,
} from 'class-validator'

@InputType()
export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string

  @IsNotEmpty()
  @Length(11, 11)
  @Field()
  cpf: string

  @IsNotEmpty()
  @IsBoolean()
  @Field()
  deliveryman: boolean
}
