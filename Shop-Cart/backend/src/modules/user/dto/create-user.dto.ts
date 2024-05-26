import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber, Min, IsIn, MinLength } from 'class-validator';
import { AddressDto } from './Address.dto';
import { POSSIBLE_CURRENCIES } from '../../../Common/Currency';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  // @ApiProperty({ description: 'Optional id that is automatically generated.', example: 1 })
  // @IsOptional()
  // @IsNumber()
  // id?: number;

  @ApiProperty({ description: 'Username' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Supported currency shortstring.' })
  @IsString()
  @IsIn(POSSIBLE_CURRENCIES)
  currency: string;

  @ApiProperty({ description: '[Optional] Initial ammount of currency.' })
  @IsNumber()
  @Min(0)
  balance?: number;

  @ApiProperty({ description: 'User pass with length >8' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: '[Optional] user address' })
  @IsOptional()
  address?: AddressDto;
}
