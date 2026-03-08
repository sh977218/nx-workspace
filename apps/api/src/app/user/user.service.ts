import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {
  }

  async findAll() {
    const user = await this.userModel.find().exec();
    return user.map(u => u.toObject());
  }

  async findOne(username: string) {
    const user = await this.userModel
      .findOne({ username }, { password: 0 })
      .exec();
    return user.toObject();
  }

  async findOneByUsernamePassword(username: string, password: string) {
    const user = await this.userModel
      .findOne({ username, password }, { password: 0 })
      .exec();
    return user.toObject();
  }

  deleteAllUsers() {
    return this.userModel.deleteMany({});
  }

  injectUsers(data: CreateUserDto[]) {
    return this.userModel.insertMany(data);
  }
}
