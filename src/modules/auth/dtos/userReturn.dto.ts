import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/modules/users/entities/user.entity'

@ObjectType()
export class LoginReturn {
  @Field()
  token: string

  @Field()
  user: User
}
