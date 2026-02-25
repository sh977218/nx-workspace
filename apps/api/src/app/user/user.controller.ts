import { Body, Controller, Get, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Post(':username')
  findOne(@Body() username: string) {
    if (username === 'me') {
      const myUsername = username;
      return this.userService.findOne(myUsername);
    }
    return this.userService.findOne(username);
  }
}
