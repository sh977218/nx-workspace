import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll() {
    return await this.userModel.find().lean().exec();
  }

  async findOne(id: string) {
    return this.userModel.find({ _id: id }).exec();
  }

  deleteAllUsers() {
    return this.userModel.deleteMany({});
  }
  injectUsers(data: CreateUserDto[]) {
    return this.userModel.insertMany(data);
  }
}
