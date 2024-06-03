import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../../database/PrismaService';
import { NotFoundException } from '@nestjs/common';
import { mockPrismaService, validCreatedUserResponse, userElement, validCreateUserDto, validUpdateuserDto as validUpdateUserDto, id, deletedUser, validAddressResponse, updatedUserResponse } from './constants';
import { hash as bcryptHash } from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it("Should NOT create a user with repeated email", async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(validCreatedUserResponse);

      await expect(service.create(validCreateUserDto)).rejects.toThrow('Email is already in use');

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: validCreateUserDto.email },
      });
      expect(mockPrismaService.user.create).not.toHaveBeenCalled();
      mockPrismaService.user.findUnique.mockReset();
    });

    it("Should hash the password and return user whithout password", async () => {
      const userPassword = validCreateUserDto.password;
      const expectedUserWithoutPassword = {
        ...validCreatedUserResponse,
        password: undefined
      };

      const result = await service.create(validCreateUserDto);

      expect(bcryptHash).toHaveBeenCalledWith(userPassword, 7);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...validCreateUserDto,
          addresses: {
            create: validCreateUserDto.addresses?.map(address => ({ ...address }))
          },
          password: 'hashedPassword',
        },
      });
      expect(result).toEqual(expectedUserWithoutPassword);
    });
  });

  describe('findOne', () => {
    it("Should throw user not found error when id does not exists in database", async () => {
      const id = 999;
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(new NotFoundException('User not found.'));
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: id,
        },
        include: { addresses: true },
      });
      mockPrismaService.user.findUnique.mockReset();
    });
  });

  // Not working because of userElement type. Maybe logic is outdated, need to check.
  // describe('update', () => {
  //   it("should delegate to findOne the validation of existance of id, return updatedUser and recive an number id", async () => {
  //     const findOneSpy = jest.spyOn(service, 'findOne').mockResolvedValue(userElement);
  //     const updateSpy = jest.spyOn(mockPrismaService.user, 'update').mockResolvedValue(updatedUserResponse);

  //     const result = await service.update(+id, validUpdateUserDto);

  //     expect(findOneSpy).toHaveBeenCalledWith(1);
  //     expect(updateSpy).toHaveBeenCalledWith({
  //       where: { id: +id },
  //       data: validUpdateUserDto,
  //     });
  //     expect(result).toEqual(updatedUserResponse);


  //     findOneSpy.mockRestore();
  //     updateSpy.mockRestore();
  //   });
  // });

  // Not working because of userElement type. Maybe logic is outdated, need to check.
  // describe('remove', () => {
  //   it("should delegate to findOne the validation of existance of id, return null and recive an number id", async () => {
  //     throw new Error("This test is expected to fail until the TODO in the user.controller.ts is completed.");

  //     // const findOneSpy = jest.spyOn(service, 'findOne').mockResolvedValue(userElement);
  //     // const updateSpy = jest.spyOn(mockPrismaService.user, 'delete').mockResolvedValue(deletedUser);

  //     // // await service.remove(+id);

  //     // expect(findOneSpy).toHaveBeenCalledWith(+id);
  //     // expect(updateSpy).toHaveBeenCalledWith({
  //     //   where: { id: +id },
  //     // });

  //     // findOneSpy.mockRestore();
  //     // updateSpy.mockRestore();
  //   });
  // });
});
