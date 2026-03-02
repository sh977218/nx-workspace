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

  async findOneByUsernamePassword(username: string, password: string) {
    return this.userModel
      .findOne({ username, password }, { password: 0 })
      .lean()
      .exec();
  }

  async findOne(username: string) {
    return this.userModel.findOne({ username }, { password: 0 }).lean().exec();
  }

  deleteAllUsers() {
    return this.userModel.deleteMany({});
  }

  injectUsers(data: CreateUserDto[]) {
    return this.userModel.insertMany(data);
  }
}
