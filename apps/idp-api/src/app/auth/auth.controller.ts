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
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const { access_token } = await this.authService.findUserAndJwt(
      signInDto.username,
      signInDto.password
    );
    if (access_token) {
      res.cookie('jwt', access_token);
      return res.redirect(process.env.UI_URL);
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({ 'message': 'Unauthorized' });
  }
}
