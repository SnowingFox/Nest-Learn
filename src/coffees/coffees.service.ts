import { Injectable } from '@nestjs/common'
import CoffeesEntity from './entities/coffees.entity'

@Injectable()
export class CoffeesService {
  private coffees: CoffeesEntity[] = [
    {
      name: '1',
    },
  ]

  findAll(): CoffeesEntity[] {
    return this.coffees
  }

  create(coffee: CoffeesEntity): CoffeesEntity[] {
    this.coffees.push(coffee)

    return this.coffees
  }
}
