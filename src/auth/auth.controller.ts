import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Public } from 'src/auth/public.decorator';
import { AuthResponse, LoginDto, SignUpDto } from './auth.dto';
import { ApiAcceptedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @Public()
  @ApiAcceptedResponse({ description: 'to check the authentication' })
  check() {
    return;
  }

  @Public()
  @Post('login')
  @ApiAcceptedResponse({ status: 200, type: AuthResponse })
  loginUser(@Body() data: LoginDto): Promise<AuthResponse> {
    return this.authService.logIn(data.mobile, data.password);
  }

  @Public()
  @Post('signup')
  @ApiAcceptedResponse({ status: 200, type: AuthResponse })
  signupUser(@Body() data: SignUpDto): Promise<AuthResponse> {
    return this.authService.signUp(data.name, data.password, data.mobile);
  }
}
