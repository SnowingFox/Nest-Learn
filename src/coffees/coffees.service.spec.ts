import { Test, TestingModule } from '@nestjs/testing'
import { CoffeesService } from './coffees.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import CoffeesEntity from './entities/coffees.entity'
import { FlavorsEntity } from './entities/flavors.entity'
import { Connection, Repository } from 'typeorm'
import Mock = jest.Mock
import { NotFoundException } from '@nestjs/common'

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
})

describe('CoffeesService', () => {
  let service: CoffeesService
  // let coffeeRepository: MockRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(FlavorsEntity), useValue: {} },
        { provide: getRepositoryToken(CoffeesEntity), useValue: {} },
      ],
    }).compile()

    service = module.get<CoffeesService>(CoffeesService)
    // coffeeRepository = module.get<MockRepository>(getRepositoryToken(CoffeesEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  // describe('findOne', () => {
  //   describe('when coffee with ID exists', () => {
  //     it('should return the coffee object', async () => {
  //       const coffeeId = 10
  //       const exceptedCoffee = {
  //         data: {
  //           id: 10,
  //           name: '雀巢',
  //           recommendations: 0,
  //         },
  //       }
  //
  //       coffeeRepository.findOne.mockReturnValue(exceptedCoffee)
  //       const coffee = await service.findOne(coffeeId)
  //       expect(coffee).toEqual(exceptedCoffee)
  //     })
  //   })
  //
  //   describe(`otherwise,"`, () => {
  //     it('should throw the "Not Found Exception', async () => {
  //       const coffeeId = 1
  //       const exceptedCoffee = undefined
  //
  //       coffeeRepository.findOne.mockReturnValue(exceptedCoffee)
  //       try {
  //         await service.findOne(coffeeId)
  //       } catch (err) {
  //         expect(err).toBeInstanceOf(NotFoundException)
  //         expect(err.message).toEqual('Not found this coffee')
  //       }
  //     })
  //   })
  // })
})
