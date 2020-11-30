import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/modules/users/entities/user.entity'
import BaseEntity from 'src/shared/utils/base.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity('deliveries')
@ObjectType()
export class Deliveries extends BaseEntity {
  @Column({ name: 'product_name', type: 'varchar', nullable: false })
  @Field({ nullable: false })
  productName: string

  @Column({ type: 'varchar', nullable: false })
  @Field({ nullable: false })
  address: string

  @Column({ name: 'post_code', type: 'varchar', nullable: false })
  @Field({ nullable: false })
  postalCode: string

  @Column({ type: 'varchar', nullable: false })
  @Field({ nullable: false })
  neighborhood: string

  @Column({ type: 'varchar', nullable: false })
  @Field({ nullable: false })
  city: string

  @Column({ type: 'varchar', nullable: false })
  @Field({ nullable: false })
  state: string

  @Column({
    name: 'canceled_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  @Field({ nullable: true })
  canceledAt: Date

  @Column({
    name: 'start_date',
    type: 'timestamp with time zone',
    nullable: true,
  })
  @Field({ nullable: true })
  startDate: Date

  @Column({
    name: 'end_date',
    type: 'timestamp with time zone',
    nullable: true,
  })
  @Field({ nullable: true })
  endDate: Date

  @Column({ nullable: true, type: 'varchar' })
  @Field({ nullable: true })
  signatureId: string

  @ManyToOne(() => User, user => user.deliveries, { cascade: true })
  @JoinColumn({ name: 'deliveryman_id' })
  @Field(() => User)
  deliveryman: User
}
