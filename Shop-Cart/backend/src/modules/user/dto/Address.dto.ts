import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class AddressDto {
  @ApiProperty({ description: 'The street of the address' })
  @IsString()
  street: string;

  @ApiProperty({ description: 'The street of the address' })
  @IsString()
  number: string;

  @ApiProperty({ description: 'The street of the address' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'The street of the address' })
  @IsString()
  state: string;

  @ApiProperty({ description: 'The street of the address' })
  @IsString()
  zipCode: string;
}
