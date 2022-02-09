import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import CoffeesEntity from './coffees.entity'

@Entity()
export class FlavorsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany((type) => CoffeesEntity, (coffee) => coffee.flavors)
  coffees: CoffeesEntity[]
}
