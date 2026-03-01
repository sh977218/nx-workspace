import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { SignInDto } from './dto/sign-in-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: SignInDto, @Res() res: Response) {
    const access_token = await this.authService.getJwt(
      signInDto.username,
      signInDto.password
    );
    if (!access_token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.cookie('jwt', access_token);
    return res.status(200).send();
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
    return res.status(200).send();
  }
}
