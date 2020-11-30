import { Field } from '@nestjs/graphql'
import { User } from 'src/modules/users/entities/user.entity'
import BaseEntity from 'src/shared/utils/base.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity('deliveries')
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
  @Field({ nullable: false })
  canceledAt: Date

  @Column({
    name: 'start_date',
    type: 'timestamp with time zone',
    nullable: false,
  })
  @Field({ nullable: false })
  startDate: Date

  @Column({
    name: 'end_date',
    type: 'timestamp with time zone',
    nullable: false,
  })
  @Field({ nullable: true })
  endDate: Date

  @ManyToOne(() => User, user => user.deliveries)
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: User
}
