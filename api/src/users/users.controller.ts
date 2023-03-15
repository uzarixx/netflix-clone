import { Body, Controller, Delete, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { AddPinDto } from './dto/add-pin.dto';
import { UserAuth } from '../guard/get-auth.decorator';
import { Accounts } from '../accounts/accounts.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { DeletePinDto } from './dto/delete-pin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginToUserDto } from './dto/login-to-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('/update-pin')
  updatePinUser(@Body() dto: AddPinDto, @UserAuth() accounts: Accounts) {
    return this.usersService.updatePinUser(dto, accounts);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('/update-username')
  updateUsername(@Body() dto: UpdateUsernameDto, @UserAuth() accounts: Accounts) {
    return this.usersService.updateUsername(dto, accounts)
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('/delete-pin')
  deletePinUser(@Body() dto: DeletePinDto, @UserAuth() accounts: Accounts) {
    return this.usersService.deletePinUser(dto, accounts);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/create-user')
  createUser(@Body() dto: CreateUserDto, @UserAuth() accounts: Accounts) {
    return this.usersService.createUser(dto, accounts);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  deleteUser(@Param('id') id: number, @UserAuth() accounts: Accounts) {
    return this.usersService.deleteUser(id, accounts);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/login-user')
  loginToUser(@UserAuth() accounts: Accounts, @Body() dto: LoginToUserDto) {
    return this.usersService.loginToUser(accounts, dto);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/get-user')
  getUser(@UserAuth() accounts: Accounts, @Body() dto: GetUserDto) {
    return this.usersService.userVerify(dto, accounts)
  }


}
