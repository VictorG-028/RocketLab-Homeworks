import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'New username', example: 'New Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'New user email', example: 'newer@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
