import { Injectable, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '~/entities/user.entity'
import { Product } from '~/entities/product.entity'
import { CreateUserDto } from './DTOs/CreateUserDto.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private jwtService: JwtService
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const isUserExisting = await this.userRepository.exists({ where: { userName: createUserDto.userName } })

    if (isUserExisting) {
      return { message: 'UserName is existing', statusCode: HttpStatus.CONFLICT, data: null }
    } else {
      const user = this.userRepository.create({...createUserDto, roles: ["USER"]})
      const data = await this.userRepository.save(user)
      return { message: 'Created user is success', statusCode: HttpStatus.CONFLICT, data }
    }
  }

  async insert() {
    const data = await this.userRepository.insert({
      name: 'hung',
      userName: 'hungpham',
      password: '123456',
      roles: ['USER']
    })
    return { message: 'string', statusCode: HttpStatus.CONFLICT, data: data }
  }

  findOne(username: string) {
    return { userId: 'string', username: 'mock_data', password: 'helloNgayMoi' }
  }
}
