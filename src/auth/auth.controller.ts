import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Public } from 'src/auth/public.decorator';
import { LoginDto, SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @Public()
  check() {
    return;
  }

  @Public()
  @Post('login')
  loginUser(@Body() data: LoginDto) {
    return this.authService.logIn(data.mobile, data.password);
  }

  @Public()
  @Post('signup')
  signupUser(@Body() data: SignUpDto) {
    return this.authService.signUp(data.name, data.password, data.mobile);
  }
}
