import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  ParseIntPipe,
  BadRequestException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { RequestLogInterceptor } from '../interceptors/request-log.interceptor';

@Serialize(UserDto)
@UseGuards(AuthGuard)
@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-user')
  @UseInterceptors(RequestLogInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }

  @Get('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/get-user/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
