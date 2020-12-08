import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm'

@Entity('user')
export class UserSchema {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  cpf: string

  @Column()
  numberOfDeliveries: number

  @CreateDateColumn()
  createdAt: Date

  @Column('uuid')
  recipientId: string

  @UpdateDateColumn()
  updatedAte: Date
}
