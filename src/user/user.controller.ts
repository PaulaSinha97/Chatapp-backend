import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { AuthGuard } from 'src/auth/guard/currentUser.guard';
// import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  getMessages(@Req() req, @CurrentUser() user_id) {
    console.log('user_iduser_id', req.headers);
    return this.usersService.findOne(user_id);
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
