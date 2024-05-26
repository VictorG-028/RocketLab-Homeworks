// import { Test, TestingModule } from '@nestjs/testing';
// import { OrderService } from './order.service';
// import { UserService } from '../user/user.service';
// import { PrismaService } from '../../database/PrismaService';

// describe('OrderService', () => {
//   let service: OrderService;
//   let userService: UserService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         OrderService,
//         UserService,
//         { provide: PrismaService, useValue: mockPrismaService }
//       ],
//     }).compile();

//     service = module.get<OrderService>(OrderService);
//     userService = module.get<UserService>(UserService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
