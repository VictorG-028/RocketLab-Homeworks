import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber, Min, IsIn, MinLength } from 'class-validator';
import { AddressDto } from './Address.dto';
import { POSSIBLE_CURRENCIES } from '../../../Common/Currency';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  // @ApiProperty({ description: 'Optional id that is automatically generated.', example: 1 })
  // @IsOptional()
  // @IsNumber()
  // id?: number;

  @ApiProperty({ description: 'Username', example: 'SOme name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'User email', example: 'example@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Supported currency shortstring.', example: 'BRL' })
  @IsString()
  @IsIn(POSSIBLE_CURRENCIES)
  currency: string;

  @ApiProperty({ description: '[Optional] Initial ammount of currency.', example: 0 })
  @IsNumber()
  @Min(0)
  balance?: number;

  @ApiProperty({ description: 'User pass with length >8', example: 'someStrongPass' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: '[Optional] user address', example: { "street": "St. example", "number": "123", "city": "CityName", "state": "Brazil", "zipCode": "123123-123" } })
  @IsOptional()
  address?: AddressDto;
}
