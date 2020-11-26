import { Field, ObjectType } from '@nestjs/graphql'

import BaseEntity from 'src/shared/utils/base.entity'
import { Column, Entity } from 'typeorm'

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

  @Column({ type: 'varchar', nullable: false })
  @Field({ nullable: false })
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  @Field({ nullable: false })
  role: UserRole
}
