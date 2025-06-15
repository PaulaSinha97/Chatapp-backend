import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';
import { CurrentUser } from 'src/decorator/currentUser.decorator';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  // @Put(":id")
  // update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDTO) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('activeId')
  getProfile(@CurrentUser() user): any {
    console.log('profile called without setting header', user);
    return user; // Access user directly
  }
}
