import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_DOCUMENT, USER_NAME } from './user.schema';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_NAME) private readonly userSchema: Model<USER_DOCUMENT>,
  ) {}
  async create(createUserDto: CreateUserDTO) {
    try {
      const createdUser = await this.userSchema.create(createUserDto);

      return createdUser;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      }

      throw new ServiceUnavailableException();
    }
  }

  async findAll(currentUser: string) {
    const users = await this.userSchema.find({ _id: { $ne: currentUser } });
    return users;
  }

  async findOne(id: string) {
    const user = await this.userSchema.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  //   async update(id: string, updateUserDto: UpdateUserDTO) {
  //     const updatedUser = await this.userSchema.findByIdAndUpdate(
  //       id,
  //       updateUserDto,
  //       {
  //         new: true,
  //       }
  //     );

  //     if (!updatedUser) {
  //       throw new NotFoundException("User not found");
  //     }

  //     return updatedUser;
  //   }

  async remove(id: string) {
    const deletedUser = await this.userSchema.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }

    return {
      _id: id,
    };
  }
}
