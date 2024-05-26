import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../database/PrismaService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const { email, password, address, ...otherData } = createUserDto;
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
        ...otherData
      },
    });

    if (createUserDto.address) {
      await this.prisma.address.create({
        data: {
          userId: userDatabaseData.id,
          ...createUserDto.address
        },
      });
    }

    const { password: shouldNotReturn, ...userReturnData } = userDatabaseData;
    return userReturnData;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const found = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException("User not found.");
    }

    return found;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const updatedUser = this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return null;
  }

  async remove(id: number) {
    await this.findOne(id);

    const deletedUser = this.prisma.user.delete({
      where: { id }
    });

    return null;
  }
}
