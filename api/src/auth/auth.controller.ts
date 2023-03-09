import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AuthDto } from './dto/auth.dto';

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
}
