import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoffeesModule } from './coffees/coffees.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoffeeRatingService } from './coffee-rating/coffee-rating.service'
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module'
import { DatabaseModule } from './database/database.module'
import databaseConfig from './config/database'
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from './common/common.module';
import coffeesConfig from './config/coffees.config'

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
    ConfigModule.forFeature(coffeesConfig),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, CoffeeRatingService],
})
export class AppModule {}
