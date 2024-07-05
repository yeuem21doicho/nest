import { Module, MiddlewareConsumer, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthService } from '../auth/auth.service'
import { UsersController } from './users.controller'
import { LoggerMiddleware } from './users.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '~/entities/user.entity'
import { Product } from '~/entities/product.entity'
import { jwtKeys } from '~/constants/jwtKeys'
import { JwtModule } from '@nestjs/jwt'
@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User, Product]),
    JwtModule.register({
      global: true,
      secret: jwtKeys.secret,
      signOptions: { expiresIn: '60s' }
    })
  ]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController)
  }
}

const HttpSt = HttpStatus.OK
