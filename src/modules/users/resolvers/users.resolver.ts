import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CreateUserDTO } from '../dtos/createUser.DTO'
import { User } from '../entities/user.entity'
import { UsersService } from '../services/users.service'
import { GqlAuthGuard } from '../../auth/guards/gqlAuth.guard'
import { UseGuards } from '@nestjs/common'
import { Role } from 'src/modules/auth/decorators/role.decorator'
import { RoleGuard } from 'src/modules/auth/guards/role.guard'

@Resolver(() => User)
@UseGuards(RoleGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  @Role('Admin')
  public async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers()

    return users
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  @Role('Admin')
  public async createUser(
    @Args('createUser') data: CreateUserDTO
  ): Promise<User> {
    const newUSer = await this.usersService.createUser(data)

    return newUSer
  }

  @Mutation(() => User)
  public async createDeliveryMan(
    @Args('createUser') data: CreateUserDTO
  ): Promise<User> {
    const newUSer = await this.usersService.createDeliveryMan(data)

    return newUSer
  }
}
