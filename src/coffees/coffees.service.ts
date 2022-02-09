import { Injectable, NotFoundException } from '@nestjs/common'
import CoffeesEntity from './entities/coffees.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'
import { Connection, Repository } from 'typeorm'
import { FlavorsEntity } from './entities/flavors.entity'
import { PaginationQueryDto } from './entities/pagination-query.dto'
import { Event } from '../event/entities/event.entity'

@Injectable()
export class CoffeesService {
  @InjectRepository(CoffeesEntity)
  private readonly coffeesRepository: Repository<CoffeesEntity>

  @InjectRepository(FlavorsEntity)
  private readonly flavorsRepository: Repository<FlavorsEntity>

  private readonly connection: Connection

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto
    return this.coffeesRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    })
  }

  findOne(id: string) {
    return this.coffeesRepository.findOne(id)
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    )

    const coffee = this.coffeesRepository.create({
      ...createCoffeeDto,
      flavors,
    })
    return this.coffeesRepository.save(coffee)
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name))))

    const coffee = await this.coffeesRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    })
    if (!coffee) {
      throw new NotFoundException(`Coffee id #${id} not found`)
    }

    return this.coffeesRepository.save(coffee)
  }

  async remove(id: string) {
    const coffee = await this.findOne(id)
    return this.coffeesRepository.remove(coffee)
  }

  async recommendCoffee(coffee: CoffeesEntity) {
    const queryRunner = this.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      coffee.recommendations++

      const recommendEvent = new Event()
      recommendEvent.name = 'recommend_coffee'
      recommendEvent.type = 'coffee'
      recommendEvent.payload = { coffeeId: coffee.id }

      await queryRunner.manager.save(coffee)
      await queryRunner.manager.save(recommendEvent)
    } catch (e) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  private async preloadFlavorByName(name: string): Promise<FlavorsEntity> {
    const existingFlavor = await this.flavorsRepository.findOne(name)
    if (existingFlavor) {
      return existingFlavor
    }
    return this.flavorsRepository.create({ name })
  }
}
