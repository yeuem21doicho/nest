import { Body, Controller, Get, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { ResponseData } from "~/interface"
import { SetMetadata } from '@nestjs/common'
import { CreateUserDto } from './DTOs/CreateUserDto.dto'


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signUp')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<ResponseData<any>> {
    return await this.usersService.createUser(createUserDto)
  }

  @Get('/insert')
  async insert(): Promise<ResponseData<any>> {
    return await this.usersService.insert()
  }
}
