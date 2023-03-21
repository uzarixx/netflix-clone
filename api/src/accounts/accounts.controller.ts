import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UserAuth } from '../guard/get-auth.decorator';
import { Accounts } from './accounts.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {
  }


  @UseGuards(JwtAuthGuard)
  @Put('/enable-two-factor')
  enableTwoFactor(@UserAuth() account: Accounts) {
    return this.accountsService.enableTwoFactor(account);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/req-disable-two-factor')
  requestDisabledTwoFactor(@UserAuth() account: Accounts) {
    return this.accountsService.requestDisabledTwoFactor(account);
  }

  @Get('/verify-disabled-two-factor/:token')
  disableTwoFactor(@Param('token') token: string) {
    return this.accountsService.disableTwoFactor(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-me')
  getAuthUser(@UserAuth() account: Accounts) {
    return this.accountsService.getAuthUser(account);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/update-password')
  updatePassword(@Body() dto: UpdatePasswordDto, @UserAuth() account: Accounts) {
    return this.accountsService.updatePassword(dto, account);
  }

}
