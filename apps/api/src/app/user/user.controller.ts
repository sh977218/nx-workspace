import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('me')
  async findOne(@Req() req: Request, @Res() res: Response) {
    const jwt = req.cookies['jwt'];
    if (!jwt) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
    const payload = this.jwtService.decode(jwt);
    const username = payload.username;
    const user = await this.userService.findOne(username);
    return res.send(user);
  }
}
