import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { Role } from 'src/modules/auth/decorators/role.decorator'
import { CreateUserDTO } from '../dtos/createUser.DTO'
import { User } from '../entities/user.entity'
import { UsersService } from '../services/users.service'
import { GqlAuthGuard } from '../../auth/guards/gqlAuth.guard'
import { UseGuards } from '@nestjs/common'
import { UserRequest } from '../../auth/decorators/user.decorator'

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  @Role('Admin')
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
