import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    console.log('>>>>>>>', signUpDto);
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @UseGuards(JwtAuthGuard)
  login(@Body() loginDto: LoginDto): Promise<{ id: string }> {
    console.log('req', loginDto);
    return this.authService.login(loginDto);
  }
}
