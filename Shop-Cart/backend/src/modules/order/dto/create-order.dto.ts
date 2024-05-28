import { IsNotEmpty, IsNumber, IsArray, ValidateNested, IsPositive, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductOrder {
  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Ammount bought.', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'User identificator', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'User bought products', example: [{ "id": 1, "quantity": 1 }] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrder)
  products: ProductOrder[];

  @ApiProperty({ description: 'Total cost of purchase (AKA ammount deduced in user balance)', example: 150 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  cost: number;
}
