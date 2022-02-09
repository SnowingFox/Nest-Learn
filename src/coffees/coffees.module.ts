import { Module } from '@nestjs/common'
import { CoffeesController } from './coffees.controller'
import { CoffeesService } from './coffees.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import CoffeesEntity from './entities/coffees.entity'
import { FlavorsEntity } from './entities/flavors.entity'
import { Event } from '../event/entities/event.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CoffeesEntity, FlavorsEntity, Event])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
