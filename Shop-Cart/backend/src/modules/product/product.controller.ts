import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, HttpStatus } from '@nestjs/common';
import { ParseIntPipe, ValidationPipe, ParseArrayPipe } from '@nestjs/common/pipes';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SearchProductByPropsDto } from './dto/findManyByProps-product.dto';

const applyIdValidation = new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST });
const applyBodyValidation = new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST });

// TODO apply ids validation in patch route without breaking the route
const applyIdsValidation = new ParseArrayPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST });

@ApiTags('Product Controller')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Stopped by some validator.' })
  async create(@Body(applyBodyValidation) createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiResponse({ status: 200, description: 'Return the product.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Stopped by some validator.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id', applyIdValidation) id: string) {
    return await this.productService.findOne(+id);
  }

  @Get('findManyByIds/:ids')
  @ApiOperation({ summary: 'Retrieve multiple products by their IDs' })
  @ApiResponse({ status: 200, description: 'Return the products.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Stopped by some validator.' })
  @ApiResponse({ status: 404, description: 'No product was found.' })
  async findManyByIds(@Param('ids') ids: string) {
    const idsNumbers: number[] = ids.split(',').map(id => +id);
    return await this.productService.findManyByIds(idsNumbers);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Stopped by some validator.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async update(@Param('id', applyIdValidation) id: string, @Body(applyBodyValidation) updateProductDto: UpdateProductDto) {
    return await this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Mark a product by ID as deleted' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Stopped by some validator.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async remove(@Param('id', applyIdValidation) id: string) {
    return await this.productService.remove(+id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Retrieve multiple products by their IDs' })
  @ApiResponse({ status: 200, description: 'Returns searched products. Can return Empty array.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Stopped by some validator.' })
  async search(@Query() searchProductByPropsDto: SearchProductByPropsDto) {
    return await this.productService.search(searchProductByPropsDto);
  }
}
