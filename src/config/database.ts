import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'todo',
  autoLoadEntities: true,
  synchronize: true,
}

export default databaseConfig
