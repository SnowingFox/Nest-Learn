import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { CoffeesService } from './coffees.service'
import CoffeesEntity from './entities/coffees.entity'
import { CreateCoffeeDto } from './dto/create-coffee.dto'

@Controller('coffees')
export class CoffeesController {
  @Inject()
  private readonly coffeesService: CoffeesService

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto)
  }
}
