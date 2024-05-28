import { IsNotEmpty, IsNumber, IsArray, ValidateNested, IsPositive, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductOrder {
  @ApiProperty({ description: 'Product ID' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Ammount bought.' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'User identificator' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'User bought products' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrder)
  products: ProductOrder[];

  @ApiProperty({ description: 'Total cost of purchase (AKA ammount deduced in user balance)' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  cost: number;
}
