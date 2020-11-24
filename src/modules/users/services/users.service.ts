import { Injectable } from '@nestjs/common'
import { CreateUserDTO } from '../dtos/createUser.DTO'
import { User } from '../entities/user.entity'
import { UsersRepository } from '../repositories/usersRepository'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find()

    return users
  }

  public async createUser(data: CreateUserDTO): Promise<User> {
    const newUser = await this.usersRepository.createUser(data)

    return newUser
  }
}
