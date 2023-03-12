import { Body, Controller, Delete, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { AddPinDto } from './dto/add-pin.dto';
import { UserAuth } from '../guard/get-auth.decorator';
import { Accounts } from '../accounts/accounts.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { DeletePinDto } from './dto/delete-pin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

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

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  deleteUser(@Param('id') id: number, @UserAuth() accounts: Accounts, @Body() dto: DeleteUserDto) {
    return this.usersService.deleteUser(id, accounts, dto);
  }


}
