import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ description: 'New price of the product.', example: 50.00 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'New description of the product.', example: 'NEW NEW NEW loooong description.' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
