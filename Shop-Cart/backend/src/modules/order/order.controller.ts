import { Controller, Post, Get, Body, Param, HttpStatus, ParseIntPipe, UsePipes } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Order Controller')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Stopped by some validator.' })
  @ApiResponse({ status: 412, description: 'Insuficient balance or not enough item in stock' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: 'Retrieve all orders for a user' })
  @ApiResponse({ status: 200, description: 'Return all orders for the user.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Stopped by some validator.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  async findAllUserOrders(@Param('userId') userId: string) {
    return await this.orderService.findAllUserOrders(+userId);
  }
}
