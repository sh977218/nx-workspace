import { Controller, Get, Headers, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':username')
  async findOne(
    @Headers('Authorization') bearer: string,
    @Param('username') username: string
  ) {
    if (username === 'me') {
      const jwt = bearer.replace('Bearer ', '');
      const payload = this.jwtService.decode(jwt);
      const myUsername = payload.username;
      return this.userService.findOne(myUsername);
    }
    return this.userService.findOne(username);
  }
}
