import { IsEmail, IsNotEmpty, Max, Min,IsIn } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  userName: string

  @IsNotEmpty()
  name: string
}
