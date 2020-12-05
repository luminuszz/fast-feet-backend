import { Field, ObjectType } from '@nestjs/graphql'
import { Exclude } from 'class-transformer'
import { Deliveries } from 'src/modules/deliveries/entities/deliveries.entity'

import BaseEntity from 'src/shared/utils/base.entity'
import { Column, Entity, OneToMany } from 'typeorm'

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  @Field({ nullable: false })
  name: string

  @Column({ type: 'varchar', nullable: false })
  @Field({ nullable: false })
  email: string

  @Column({ type: 'varchar', nullable: false })
  @Field({ nullable: false })
  cpf: string

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  @Field({ nullable: false })
  role: UserRole

  @OneToMany(() => Deliveries, deliveries => deliveries.deliveryman)
  deliveries: Deliveries[]
}
