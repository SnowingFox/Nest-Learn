import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoffeesModule } from './coffees/coffees.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoffeeRatingService } from './coffee-rating/coffee-rating.service'
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module'
import { DatabaseModule } from './database/database.module'
import databaseConfig from './config/database'

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot(databaseConfig),
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, CoffeeRatingService],
})
export class AppModule {}
