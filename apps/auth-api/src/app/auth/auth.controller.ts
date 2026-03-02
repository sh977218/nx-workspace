import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { UserService } from '../user/user.service';

import { SignInDto } from './dto/sign-in-dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('user')
  async jwt(@Req() req: Request, @Res() res: Response) {
    const jwt = req.cookies?.['jwt'];
    if (!jwt) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
    const payload = this.jwtService.decode(jwt);
    const myUsername = payload.username;
    const user = await this.userService.findOne(myUsername);
    return res.status(HttpStatus.OK).send(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() { username, password }: SignInDto, @Res() res: Response) {
    const user = await this.userService.findOneByUsernamePassword(
      username,
      password,
    );
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
    const payload = { sub: user.id, username: user.username };
    const jwt = await this.jwtService.signAsync(payload);
    res.cookie('jwt', jwt);
    return res.status(HttpStatus.OK).send({
      jwt,
      user,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
    return res.status(200).send();
  }
}
