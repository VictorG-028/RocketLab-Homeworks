import { BadRequestException, Injectable, PreconditionFailedException } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService, private readonly userService: UserService) { }

  async create(createOrderDto: CreateOrderDto) {
    const { userId, products, cost } = createOrderDto;

    const user = await this.userService.findOne(userId);

    if (user.balance < cost) {
      throw new PreconditionFailedException('Insufficient balance');
    }

    const stocks = await this.prisma.product.findMany({
      where: {
        id: { in: products.map(p => p.id) }
      },
      select: {
        id: true,
        quantity: true
      }
    });

    const insufficientStock = stocks.some((stock) => {
      const requestedQuantity = products.find(p => p.id === stock.id)?.quantity || 0;
      return stock.quantity < requestedQuantity;
    });

    if (insufficientStock) {
      throw new PreconditionFailedException('Item does not have sufficient stock');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          decrement: cost,
        },
      },
    });

    const order = await this.prisma.order.create({
      data: {
        userId,
        cost,
      },
    });

    const orderProducts = products.map(product => ({
      orderId: order.id,
      productId: product.id,
      quantity: product.quantity,
    }));

    await this.prisma.orderProduct.createMany({
      data: orderProducts,
    });

    await this.prisma.$transaction(
      products.map((product) => {
        return this.prisma.product.update({
          where: { id: product.id },
          data: {
            quantity: {
              decrement: product.quantity
            }
          },
        });
      })
    );

    return order;
  }

  async findAllUserOrders(userId: number) {
    await this.userService.findOne(userId);

    return await this.prisma.order.findMany({
      where: { userId },
      include: {
        products: {
          include: {
            product: true,
          }
        }
      }
    });
  }
}
