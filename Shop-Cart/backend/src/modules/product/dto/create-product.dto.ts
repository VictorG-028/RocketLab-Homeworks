import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, Min, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { POSSIBLE_CURRENCIES } from '../../../Common/Currency';

export class CreateProductDto {
  // @ApiProperty({ description: 'Optional id that is automatically generated.', example: 1 })
  // @IsOptional()
  // @IsNumber()
  // id?: number;

  @ApiProperty({ description: 'URL shown at the home page in the frontend.', example: 'http://example.com/image.jpg' })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({ description: 'Name of the product.', example: 'Product Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Price of the product.', example: 99.99 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Currency of the product price.', enum: POSSIBLE_CURRENCIES, example: 'USD' })
  @IsNotEmpty()
  @IsString()
  @IsIn(POSSIBLE_CURRENCIES)
  currency: string;

  @ApiProperty({ description: 'Description of the product.', example: 'Ultra Mega Blaster Super Newer product loooong description.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Indicates if the product can be shipped after the customer places an order.', example: true })
  @IsOptional()
  @IsBoolean()
  readyToShipToday?: boolean;

  @ApiProperty({ description: 'Brand of the product.', example: 'Brand Name' })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({ description: 'Model of the product.', example: 'Model X' })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({ description: 'Color of the product.', example: 'Red' })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({ description: 'Connectivity options of the product.', example: 'Cable' }) // ['Cable', 'Wireless', 'WiFi', 'Bluetooth']
  @IsNotEmpty()
  @IsString()
  connectivity: string;

  @ApiProperty({ description: 'Quantity of the product in stock.', example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @ApiProperty({ description: 'True if product is considered deleted.', example: false })
  @IsOptional()
  @IsBoolean()
  isRemoved?: boolean;
}
