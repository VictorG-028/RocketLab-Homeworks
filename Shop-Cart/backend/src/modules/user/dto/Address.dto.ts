import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class AddressDto {
  @ApiProperty({ description: 'address id', example: 1 })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ description: 'Street name', example: 'St. example' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ description: 'Street number', example: '123' })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({ description: 'City name', example: 'CityName' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'State name', example: 'Brazil' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'Zip code', example: '123123-123' })
  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @ApiProperty({ description: 'User id', example: 1 })
  @IsOptional()
  @IsNumber()
  userId?: number;
}
