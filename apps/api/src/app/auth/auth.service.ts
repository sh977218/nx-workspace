import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
  }

  async signIn(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    const userObj = user?.toObject();
    if (userObj?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = userObj;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
