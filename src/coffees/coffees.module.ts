import { Module } from '@nestjs/common'
import { CoffeesController } from './coffees.controller'
import { CoffeesService } from './coffees.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import CoffeesEntity from './entities/coffees.entity'
import { FlavorsEntity } from './entities/flavors.entity'
import { Event } from '../event/entities/event.entity'
import { COFFEES_BRANDS } from './coffees.constant'
import { ConfigModule } from '@nestjs/config'
import coffeesConfig from '../config/coffees.config'

@Module({
  imports: [
    TypeOrmModule.forFeature([CoffeesEntity, FlavorsEntity, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService, { provide: COFFEES_BRANDS, useValue: ['雀巢', '卡布奇诺'] }],
  exports: [CoffeesService],
})
export class CoffeesModule {}
