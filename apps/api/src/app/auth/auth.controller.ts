import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { UserService } from '../user/user.service';

import { SignInDto } from './dto/sign-in-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() { username, password }: SignInDto
  ) {
    const jwtInCookie = req.cookies?.['jwt'];
    if (!jwtInCookie && !username) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
    let user = null;
    if (jwtInCookie) {
      const payload = this.jwtService.decode(jwtInCookie);
      const myUsername = payload.username;
      user = await this.userService.findOne(myUsername);
    }
    if (username) {
      user = await this.userService.findOneByUsernamePassword(
        username,
        password
      );
    }

    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
    const payload = { sub: user.id, username: user.username };
    const jwt = await this.jwtService.signAsync(payload);
    res.cookie('jwt', jwt, {
      domain: process.env.UI_URL ?? '/'
    });
    return res.status(HttpStatus.OK).send({
      jwt,
      user
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt', {
      domain: process.env.UI_URL ?? '/'
    });
    return res.status(200).send();
  }
}
