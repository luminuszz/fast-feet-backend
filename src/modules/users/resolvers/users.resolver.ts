import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CreateUserDTO } from '../dtos/createUser.DTO'
import { User } from '../entities/user.entity'
import { UsersService } from '../services/users.service'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  public async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers()

    return users
  }

  @Mutation(() => User)
  public async createUser(
    @Args('createUser') data: CreateUserDTO
  ): Promise<User> {
    const newUSer = await this.usersService.createUser(data)

    return newUSer
  }
}
