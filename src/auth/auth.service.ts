import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  private async generateToken(payload: object): Promise<AuthResponse> {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async logIn(mobile: string, password: string): Promise<AuthResponse> {
    const user = await this.userService.findOne(mobile);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    return await this.generateToken({ id: user.id });
  }

  async signUp(
    user_name: string,
    password: string,
    mobile: string,
  ): Promise<AuthResponse> {
    const user = await this.userService.create(user_name, password, mobile);
    return await this.generateToken({ id: user.id });
  }
}
