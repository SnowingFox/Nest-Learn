import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoffeesModule } from './coffees/coffees.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import databaseConfig from './config/database'

@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot(databaseConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
