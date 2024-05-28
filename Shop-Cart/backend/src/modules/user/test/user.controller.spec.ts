import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { ModuleMocker } from 'jest-mock';
import { PrismaService } from '../../../database/PrismaService';
import { mockUserService, mockPrismaService, validCreatedUserResponse, validCreateUserDto, invalidCreateUserDto, id, userElement, invalidId, validUpdateuserDto, invalidUpdateUserDto } from './constants';

describe('UserController', () => {
  let app: INestApplication;
  let controller: UserController;
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    controller = moduleRef.get<UserController>(UserController);
    service = moduleRef.get<UserService>(UserService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it("Should create a user with VALID inputs", async () => {
      jest.spyOn(service, 'create').mockResolvedValue(validCreatedUserResponse);
      const result = await controller.create(validCreateUserDto);

      expect(result).toBe(validCreatedUserResponse);
      expect(service.create).toHaveBeenCalledWith(validCreateUserDto);
    });

    it('should NOT create a user with INVALID inputs', async () => {
      return request(app.getHttpServer())
        .post("/user/")
        .send(invalidCreateUserDto)
        .expect(400)
        .expect({
          message: [
            'email must be an email',
            'currency must be one of the following values: USD, EUR, GBP, BRL, JPY',
            'balance must not be less than 0',
            'balance must be a number conforming to the specified constraints',
            'password must be longer than or equal to 8 characters'
          ],
          error: 'Bad Request',
          statusCode: 400
        });
      // expect(service.create).not.toHaveBeenCalled(); // TODO
    });
  });

  describe('findAll', () => {
    it("Should return an empty array as initial state", async () => {
      const expectedResult = [userElement];

      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(expectedResult);
      const result = await controller.findAll();

      expect(result).toStrictEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it("Should return the user passing a valid id", async () => {
      const result = await controller.findOne(id);
      expect(result).toBe(userElement);
    });

    it("apply id pipe and throw error when passing invalid id", async () => {
      const mockParseIntPipe = jest.spyOn(service, 'findOne').mockImplementation(() => {
        throw new HttpException('Bad Request. Stopped by some validator.', HttpStatus.BAD_REQUEST);
      });

      await expect(controller.findOne(invalidId)).rejects.toThrow('Bad Request. Stopped by some validator.');
      mockParseIntPipe.mockRestore();
    });
  });

  describe('update', () => {
    it("Should return the updated user passing a valid body", async () => {
      jest.spyOn(service, 'update').mockResolvedValue(null);

      const result = await controller.update(id, validUpdateuserDto);

      expect(result).toBe(null);
      expect(service.update).toHaveBeenCalledWith(+id, validUpdateuserDto);
    });

    it("apply dto pipe and throw error when passing invalid body", async () => {
      return request(app.getHttpServer())
        .patch(`/user/${id}`)
        .send(invalidUpdateUserDto)
        .expect(400)
        .expect({
          "message": ['name should not be empty'],
          "error": "Bad Request",
          "statusCode": 400
        });
    });

    it("apply dto pipe and throw error when passing invalid id", async () => {
      return request(app.getHttpServer())
        .patch(`/user/${invalidId}`)
        .send(validUpdateuserDto)
        .expect(400)
        .expect({
          "message": "Validation failed (numeric string is expected)",
          "error": "Bad Request",
          "statusCode": 400
        });
    });
  });

  // describe('delete', () => {

  // });

  afterAll(async () => {
    await app.close();
  });

}); // Fim do describe('UserController')
