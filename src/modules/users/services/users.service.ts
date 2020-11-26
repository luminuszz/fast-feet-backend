import { Injectable } from '@nestjs/common'
import { HashService } from 'src/shared/providers/hash/hash.service'
import { CreateUserDTO } from '../dtos/createUser.DTO'
import { User, UserRole } from '../entities/user.entity'
import { UsersRepository, Field } from '../repositories/usersRepository'

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService
  ) {}

  public async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find()

    return users
  }

  public async createUser(data: CreateUserDTO): Promise<User> {
    const hash = await this.hashService.createHash(data.password)

    const newUser = this.usersRepository.createUser({
      ...data,
      password: hash,
      role: UserRole.User,
    })

    return newUser
  }

  public async findOneUser({
    column,
    value,
  }: Field): Promise<User | undefined> {
    const currentUser = await this.usersRepository.findOneUse({ column, value })

    return currentUser
  }
}
