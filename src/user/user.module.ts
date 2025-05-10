import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { USER_SCHEMA, USER_NAME } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([{name:USER_NAME,schema:USER_SCHEMA}])],
  exports: [MongooseModule],
  providers: [UserService],
      controllers: [UserController]
  
})
export class UserModule {}
