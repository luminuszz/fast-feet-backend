import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { MongoRepository } from 'typeorm'
import { UserSchema } from '../schemas/user.schema'
import { connection } from '../../../config/connections'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class ResetNumberOfDeliveryTask {
  constructor(
    @InjectRepository(UserSchema, connection.mongo)
    private readonly usersMongoRepository: MongoRepository<UserSchema>
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM, { name: 'resetDeliveriesNimber' })
  public async execute(): Promise<void> {
    console.log('fui chamado')
    try {
      await this.usersMongoRepository.updateMany(
        {},
        { $set: { numberOfDeliveries: 0 } }
      )
    } catch (error) {
      console.log(error.message)
    }
  }
}
