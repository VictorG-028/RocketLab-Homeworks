import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpStatus, ParseIntPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

const applyIdValidation = new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST });
const applyBodyValidation = new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST });

@ApiTags('User Controller')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Stopped by some validator.' })
  async create(@Body(applyBodyValidation) createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Stopped by some validator.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  async findOne(@Param('id', applyIdValidation) id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Stopped by some validator.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(
    @Param('id', applyIdValidation) id: string,
    @Body(applyBodyValidation) updateUserDto: UpdateUserDto
  ) {
    return await this.userService.update(+id, updateUserDto);
  }

  // TODO: service remove method is broken, need to delete all user related rows or mark user as deleted with new column in prisma.schema 
  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete user by ID' })
  // @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  // @ApiResponse({ status: 400, description: 'Bad Request. Stopped by some validator.' })
  // @ApiResponse({ status: 404, description: 'User not found.' })
  // async remove(@Param('id', applyIdValidation) id: string) {
  //   return await this.userService.remove(+id);
  // }
}
