import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async getJwt(username: string, password: string) {
    const user = await this.userService.findOneByUsernamePassword(
      username,
      password
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return await this.jwtService.signAsync(payload);
  }
}
