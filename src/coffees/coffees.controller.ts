import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common'
import { CoffeesService } from './coffees.service'
import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'
import { PaginationQueryDto } from './entities/pagination-query.dto'
import { Public } from '../common/decorators/public.decorator'
import { ParseIntPipe } from '../common/pipes/parse-int.pipe'
import { Protocol } from '../common/decorators/protocol.decorator'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  @Inject()
  private readonly coffeesService: CoffeesService

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Public()
  @Get()
  async findAll(@Protocol('hi') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log(protocol)
    return this.coffeesService.findAll(paginationQuery)
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coffeesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto)
  }

  @Delete('id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coffeesService.remove(id)
  }
}
