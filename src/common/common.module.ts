import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ApiKeyGuard } from './guards/api-key.guard'
import { LoggingMiddleware } from './middlewares/logging.middleware'

@Module({ providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }] })
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware).forRoutes('*')
  }
}
