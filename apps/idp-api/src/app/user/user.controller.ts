import { Controller, Get, Headers } from '@nestjs/common';
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

  @Get('me')
  async findOne(
    @Headers('Authorization') bearer: string
  ) {
    if (!bearer) {
      throw new Error('Missing bearer token');
    }
    const jwt = bearer.replace('Bearer ', '');
    const payload = this.jwtService.decode(jwt);
    const myUsername = payload.username;
    return this.userService.findOne(myUsername);
  }
}
