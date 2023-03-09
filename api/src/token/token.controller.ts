import { Controller, Get, Param } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {
  }

  @Get('/activate/:value')
  verifyToken(@Param('value') value: string) {
    return this.tokenService.verifyToken(value);
  }

}
