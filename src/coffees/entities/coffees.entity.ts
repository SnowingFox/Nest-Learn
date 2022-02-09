import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { JoinTable } from 'typeorm'
import { FlavorsEntity } from './flavors.entity'

@Entity()
export default class CoffeesEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ default: 0 })
  recommendations: number

  @JoinTable()
  @ManyToMany((type) => FlavorsEntity, (flavors) => flavors.coffees, {
    cascade: true,
  })
  flavors: FlavorsEntity[]
}
