import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateForgotTokenDto } from './dto/create-forgot-token.dto';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {
  }

  @Get('/activate/:value')
  verifyToken(@Param('value') value: string) {
    return this.tokenService.verifyToken(value);
  }

  @Post('/create-forgot-token')
  createForgotToken(@Body() dto: CreateForgotTokenDto) {
    return this.tokenService.createForgotToken(dto);
  }

  @Get('/verify-forgot-token')
  verifyForgotToken(@Query('token') token: string) {
    return this.tokenService.verifyForgotToken(token);
  }


}
