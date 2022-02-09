import { IsArray, IsNumber, IsString } from 'class-validator'
import { FlavorsEntity } from '../entities/flavors.entity'

export class CreateCoffeeDto {
  @IsString()
  name: string

  @IsArray()
  flavors: string[]
}
