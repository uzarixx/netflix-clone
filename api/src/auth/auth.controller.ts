import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AuthDto } from './dto/auth.dto';
import { TwoFactorTokenDto } from './dto/two-factor-token.dto';
import { LoginAndUpdatePasswordDto } from './dto/login-and-update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() dto: AuthDto) {
    return this.authService.registration(dto);
  }

  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @UsePipes(ValidationPipe)
  @Post('/login-two-factor')
  loginTwoFactor(@Body() dto: TwoFactorTokenDto) {
    return this.authService.loginTwoFactor(dto);
  }

  @UsePipes(ValidationPipe)
  @Post('/login-and-update-password')
  loginAndUpdatePassword(@Body() dto: LoginAndUpdatePasswordDto) {
    return this.authService.loginAndUpdatePassword(dto);
  }
}
