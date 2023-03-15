import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { AddPinDto } from './dto/add-pin.dto';
import { Accounts } from '../accounts/accounts.model';
import { DeletePinDto } from './dto/delete-pin.dto';
import { AccountsService } from '../accounts/accounts.service';
import * as process from 'process';
import { JwtService } from '@nestjs/jwt';
import { LoginToUserDto } from './dto/login-to-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private usersRepository: typeof Users, private accountService: AccountsService, private jwtService: JwtService) {
  }

  async createUser(dto: CreateUserDto, accounts: { id: number }) {
    const count = await this.usersRepository.count({ where: { accountId: accounts.id } });
    if (count >= 5) {
      throw new HttpException('Limit 5 users to one account', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersRepository.create({ ...dto, accountId: accounts.id, avatar: '', pin: null });
    return user;
  }

  async updatePinUser(dto: AddPinDto, accounts: Accounts) {
    const user = await this.usersRepository.findOne({ where: { accountId: accounts.id, id: dto.userId } });
    if (!user) {
      throw new HttpException('user is not a found', HttpStatus.NOT_FOUND);
    }
    await user.update({ pin: dto.pin, isPin: true });
    await user.save();
    return user;
  }

  async updateUsername(dto: UpdateUsernameDto, accounts: Accounts) {
    const user = await this.usersRepository.findOne({ where: { accountId: accounts.id, id: dto.userId } });
    if (!user) {
      throw new HttpException('user is not a found', HttpStatus.NOT_FOUND);
    }
    await user.update({ username: dto.username });
    await user.save();
    return user;
  }

  async deletePinUser(dto: DeletePinDto, accounts: Accounts) {
    const user = await this.usersRepository.findOne({ where: { accountId: accounts.id, id: dto.userId } });
    if (!user) {
      throw new HttpException('user is not a found', HttpStatus.NOT_FOUND);
    }
    await user.update({ pin: null, isPin: false });
    await user.save();
    return user;
  }

  async deleteUser(id: number, accounts: Accounts) {
    const user = await this.usersRepository.findOne({ where: { accountId: accounts.id, id } });
    if (!user) {
      throw new HttpException('user is not a found', HttpStatus.NOT_FOUND);
    }
    await user.destroy();
    return user;
  }

  async loginToUser(account: Accounts, dto: LoginToUserDto) {
    const user = await this.usersRepository.findOne({ where: { id: dto.userId } });
    if (!user || user.accountId !== account.id) {
      throw new HttpException('user is not a found', HttpStatus.NOT_FOUND);
    }
    if ((user.pin && (user.pin !== dto.pin))) {
      throw new HttpException('Pin is not valid', HttpStatus.NOT_FOUND);
    }
    return this.generateToken(account.id, user.id);
  }

  private async generateToken(accountId: number, userId: number) {
    const payload = {
      userId,
      accountId,
    };
    return {
      token: this.jwtService.sign(payload, { secret: process.env.PRIVATE_KEY }),
    };
  }

  async userVerify(dto: GetUserDto, account: Accounts) {
    const accountResult = await this.accountService.getAccountById(account.id);
    if (!accountResult) {
      throw new HttpException('user is not a found', HttpStatus.NOT_FOUND);
    }
    const verifyResult = this.jwtService.verify(dto.token, { secret: process.env.PRIVATE_KEY });
    if (verifyResult.accountId !== accountResult.id) {
      throw new HttpException('user is not a found', HttpStatus.NOT_FOUND);
    }
    const user = await this.usersRepository.findOne({ where: { id: verifyResult.userId } });
    return user;
  }

}
