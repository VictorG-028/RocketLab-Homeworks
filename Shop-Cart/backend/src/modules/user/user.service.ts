import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../database/PrismaService';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { AddressDto } from './dto/Address.dto';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const { email, password, addresses: address, ...otherData } = createUserDto;
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const userDatabaseData = await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        ...otherData,
        addresses: {
          create: createUserDto.addresses,
        },
      },
    });

    const { password: shouldNotReturn, ...userReturnData } = userDatabaseData;
    return userReturnData;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const found = await this.prisma.user.findUnique({
      where: { id },
      include: { addresses: true }
    });

    if (!found) {
      throw new NotFoundException("User not found.");
    }

    return found;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const addressUpdates = updateUserDto.addresses?.map(address => ({
      where: { id: address.id },
      data: {
        street: address.street,
        number: address.number,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
      },
    }));

    const prismaUpdateData: Prisma.UserUpdateInput = {
      ...updateUserDto,
      addresses: {
        updateMany: addressUpdates,
      },
    };

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: prismaUpdateData,
      include: { addresses: true }
    });

    return updatedUser;
  }

  // Broken, see controller Delete(':id') route for more info.
  // async remove(id: number) {
  //   await this.findOne(id);

  //   const deletedUser = await this.prisma.user.delete({
  //     where: { id }
  //   });

  //   return null;
  // }
}
