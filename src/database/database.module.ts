import { DynamicModule, Module } from '@nestjs/common'
import { ConnectionOptions, createConnection } from 'typeorm'

@Module({})
export class DatabaseModule {
  static registry(options: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: createConnection(options),
        },
      ],
    }
  }
}
