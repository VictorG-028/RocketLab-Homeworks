import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../../database/PrismaService';
import { SearchProductByPropsDto } from './dto/findManyByProps-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    const createdProduct = await this.prisma.product.create({
      data: createProductDto,
    });

    return createdProduct;
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const found = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException("Product not found.");
    }

    return found;
  }

  async findManyByIds(ids: number[]) {
    const foundList = await this.prisma.product.findMany({
      where: { id: { in: ids } },
    });

    if (foundList.length == 0) {
      throw new NotFoundException("No product was found.");
    }

    return foundList;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    await this.findOne(id);

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });

    return null;
  }

  async remove(id: number) {

    await this.findOne(id);

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        isRemoved: true,
      }
    });

    return null;
  }

  async search(searchProductByPropsDto: SearchProductByPropsDto) {
    const { minPrice, maxPrice, minQuantity, query, returnOnlyReadyToShip, returnOnlyDeleted } = searchProductByPropsDto;

    return await this.prisma.product.findMany({
      where: {
        ...(minPrice !== undefined && { price: { gte: minPrice } }),
        ...(maxPrice !== undefined && { price: { lte: maxPrice } }),
        ...(minQuantity !== undefined && { quantity: { gte: minQuantity } }),
        ...(query && {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } }
          ]
        }),
        ...(returnOnlyReadyToShip !== undefined && { readyToShipToday: returnOnlyReadyToShip }),
        ...(returnOnlyDeleted !== undefined && { isRemoved: returnOnlyDeleted }),
      }
    });
  }
}
