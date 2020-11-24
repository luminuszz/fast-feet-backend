import { Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDTO } from '../dtos/createUser.DTO'
import { User } from '../entities/user.entity'

@Injectable()
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async createUser(data: CreateUserDTO): Promise<User> {
    const newUser = this.create(data)

    await this.save(newUser)

    return newUser
  }
}
