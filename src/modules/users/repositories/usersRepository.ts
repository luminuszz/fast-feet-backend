import { Inject, Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDTO } from '../dtos/createUser.DTO'
import { User } from '../entities/user.entity'
import { HashService } from '../../../shared/providers/hash/hash.service'

export interface Field {
  column: keyof User
  value: string
}

@Injectable()
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async createUser(data: CreateUserDTO): Promise<User> {
    const newUser = this.create({ ...data })

    await this.save(newUser)

    return newUser
  }

  public async findOneUse({ column, value }: Field): Promise<User | undefined> {
    const user = await this.findOne({ where: { [column]: value } })

    return user
  }
}
