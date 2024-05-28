import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchProductByPropsDto {

  @ApiProperty({ description: 'Min price bound.', example: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  minPrice?: number;

  @ApiProperty({ description: 'Max price bound.', example: 1000.99 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxPrice?: number;

  @ApiProperty({ description: 'Return only products with anough quantity.', example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minQuantity?: number;

  @ApiProperty({ description: 'Query used to find a prop in product that match a word in this query.', example: 'canot be empty and is optional in body' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({ description: 'Knob to return only readyToShipToday prop.', example: true })
  @IsOptional()
  @IsBoolean()
  returnOnlyReadyToShip?: boolean;

  @ApiProperty({ description: 'Knob to return only deleted products.', example: false })
  @IsOptional()
  @IsBoolean()
  returnOnlyDeleted?: boolean;
}
