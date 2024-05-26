import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

export const validCreateUserDto: CreateUserDto = {
  email: 'test@example.com',
  password: 'password',
  name: 'test',
  currency: 'BRL',
  address: {
    street: "Rua fulano",
    city: "Recife",
    state: "Brasil",
    number: "123",
    zipCode: "123456-789"
  }
};
export const validCreatedUserResponse = {
  id: 1,
  balance: 0,
  ...validCreateUserDto,
};
export const validAddressResponse = {
  ...validCreateUserDto.address,
  id: 1,
  userId: validCreatedUserResponse.id
};
export const invalidCreateUserDto: CreateUserDto = {
  email: 'NOT_VALID_example.email',
  password: '2short',
  name: 'test',
  currency: 'NOT DEFINED CURRENCY'
};
export const userElement = validCreatedUserResponse;

export const id = '1';
export const invalidId = 'invalid';

export const validUpdateuserDto: UpdateUserDto = {
  ...validCreateUserDto,
  name: "new name",
};
export const invalidUpdateUserDto: UpdateUserDto = {
  ...validCreateUserDto,
  name: "",
};

export const updatedUserResponse = {
  ...validUpdateuserDto,
  id: id,
  balance: 0,
};

export const deletedUser = validCreatedUserResponse;

export const mockUserService = {
  create: jest.fn().mockResolvedValue(validCreatedUserResponse),
  findAll: jest.fn().mockResolvedValue([userElement]),
  findOne: jest.fn().mockResolvedValue(userElement),
  update: jest.fn().mockResolvedValue(null),
  remove: jest.fn().mockResolvedValue(null),
};

export const mockPrismaService = {
  user: {
    findUnique: jest.fn().mockResolvedValue(validCreatedUserResponse),
    findMany: jest.fn().mockResolvedValue([userElement]),
    create: jest.fn().mockResolvedValue(validCreatedUserResponse),
    update: jest.fn().mockResolvedValue(updatedUserResponse),
    delete: jest.fn().mockResolvedValue(deletedUser),
  },
  address: {
    create: jest.fn().mockResolvedValue(validAddressResponse),
  },
};
