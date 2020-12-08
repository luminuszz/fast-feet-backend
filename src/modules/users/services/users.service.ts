import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { HashService } from 'src/shared/providers/hash/hash.service'
import { CreateUserDTO } from '../dtos/createUser.DTO'
import { User, UserRole } from '../entities/user.entity'
import { UserSchema } from '../schemas/user.schema'
import { connection } from 'src/config/connections'
import { UsersRepository, Field } from '../repositories/usersRepository'
import { MongoRepository } from 'typeorm'

interface SaveNumberOfDeliveriesRequest {
  cpf: string
  recipientId: string
}

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
    @InjectRepository(UserSchema, connection.mongo)
    private readonly usersMongoRepository: MongoRepository<UserSchema>
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
      role: UserRole.Admin,
    })

    return newUser
  }

  public async createDeliveryMan(data: CreateUserDTO): Promise<User> {
    const hash = await this.hashService.createHash(data.password)

    const newUser = await this.usersRepository.createUser({
      ...data,
      password: hash,
      role: UserRole.User,
    })

    await this.saveNumberOfDeliveries({
      cpf: newUser.cpf,
      recipientId: newUser.id,
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

  public async saveNumberOfDeliveries({
    cpf,
    recipientId,
  }: SaveNumberOfDeliveriesRequest): Promise<UserSchema> {
    const newRegister = this.usersMongoRepository.create({
      cpf,
      recipientId,
      numberOfDeliveries: 0,
    })

    await this.usersMongoRepository.save(newRegister)

    return newRegister
  }

  public async incrementNumberOfDeliveries(recipientId: string): Promise<void> {
    const currentDeliveryMan = await this.usersMongoRepository.findOne({
      where: { recipientId },
    })

    if (!currentDeliveryMan) {
      throw new BadRequestException('user not found')
    }

    if (currentDeliveryMan.numberOfDeliveries >= 10) {
      throw new UnauthorizedException(
        'This delivery at complete deliveries today'
      )
    }

    currentDeliveryMan.numberOfDeliveries += 1

    await this.usersMongoRepository.save(currentDeliveryMan)

    console.log(currentDeliveryMan)
  }

  public async verifyNumberOfDeliveries(recipientId: string): Promise<boolean> {
    const currentUser = await this.usersMongoRepository.findOne({
      where: { recipientId },
    })

    return currentUser.numberOfDeliveries < 5
  }
}
