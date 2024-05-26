import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../../database/PrismaService';
import { NotFoundException } from '@nestjs/common';
import { mockPrismaService, validCreatedUserResponse, userElement, validCreateUserDto, validUpdateuserDto, id, deletedUser, validAddressResponse } from './constants';
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

    it("Should hash the password and return user whitout password", async () => {
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
          address: undefined,
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
        where: { id: id },
      });
      mockPrismaService.user.findUnique.mockReset();
    });
  });

  describe('update', () => {
    it("should delegate to findOne the validation of existance of id, return null and recive an number id", async () => {
      const findOneSpy = jest.spyOn(service, 'findOne').mockResolvedValue(userElement);
      const updateSpy = jest.spyOn(mockPrismaService.user, 'update').mockResolvedValue(null);

      await service.update(+id, validUpdateuserDto);

      expect(findOneSpy).toHaveBeenCalledWith(1);
      expect(updateSpy).toHaveBeenCalledWith({
        where: { id: +id },
        data: validUpdateuserDto,
      });

      findOneSpy.mockRestore();
      updateSpy.mockRestore();
    });
  });

  describe('remove', () => {
    it("should delegate to findOne the validation of existance of id, return null and recive an number id", async () => {
      const findOneSpy = jest.spyOn(service, 'findOne').mockResolvedValue(userElement);
      const updateSpy = jest.spyOn(mockPrismaService.user, 'delete').mockResolvedValue(deletedUser);

      await service.remove(+id);

      expect(findOneSpy).toHaveBeenCalledWith(+id);
      expect(updateSpy).toHaveBeenCalledWith({
        where: { id: +id },
      });

      findOneSpy.mockRestore();
      updateSpy.mockRestore();
    });
  });
});
