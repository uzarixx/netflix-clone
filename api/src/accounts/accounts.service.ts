import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Accounts } from './accounts.model';
import { InjectModel } from '@nestjs/sequelize';
import { TokenService } from '../token/token.service';
import { Users } from '../users/users.model';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AccountsService {

  constructor(@InjectModel(Accounts) private accountsRepository: typeof Accounts, @Inject(forwardRef(() => TokenService)) private tokenService: TokenService) {
  }

  async getAccountByEmail(email: string) {
    const user = await this.accountsRepository.findOne({ where: { email } });
    return user;
  }

  async getAccountById(id: number) {
    const user = await this.accountsRepository.findOne({ where: { id } });
    return user;
  }

  async createUser(dto: { email: string, password: string }) {
    const user = await this.accountsRepository.create(dto);
    return user;
  }

  async updateIsVerify(userId: number) {
    const account = await this.accountsRepository.findOne({ where: { id: userId }, attributes: ['id', 'isVerify'] });
    account.isVerify = true;
    await account.save();
    return account;
  }

  async enableTwoFactor(account: Accounts) {
    const candidate = await this.accountsRepository.findOne({
      where: { id: account.id },
      attributes: { exclude: ['password'] },
    });
    if (!candidate || !candidate.isVerify || candidate.twoFactor) {
      throw new HttpException('Error connecting two-factor authentication', HttpStatus.BAD_REQUEST);
    }
    candidate.twoFactor = true;
    await candidate.save();
    return candidate;
  }

  async requestDisabledTwoFactor(account: Accounts) {
    const candidate = await this.accountsRepository.findOne({
      where: { id: account.id },
      attributes: { exclude: ['password'] },
    });
    if (!candidate || !candidate.isVerify || !candidate.twoFactor) {
      throw new HttpException('Two factor auth is not activated', HttpStatus.BAD_REQUEST);
    }
    const token = Math.floor(Math.random() * 9000 + 1000);
    await this.tokenService.disabledTwoFactorToken(String(token), candidate);
    return 'Enable code send to your e-mai.';
  }

  async disableTwoFactor(token: string) {
    const tokenFind = await this.tokenService.verifyDisabledTwoFactorToken(token);
    if (!tokenFind) {
      throw new HttpException('Two factor auth is not a disabled', HttpStatus.BAD_REQUEST);
    }
    const account = await this.accountsRepository.findOne({
      where: { id: tokenFind.userId },
      include: [{ model: Users, attributes: { exclude: ['pin'] } }],
      attributes: { exclude: ['password'] },
    });
    account.twoFactor = false;
    await account.save();
    return account;
  }

  async getAuthUser(account: Accounts) {
    const accountResponse = await this.accountsRepository.findOne({
      where: { id: account.id },
      include: [{ model: Users, attributes: { exclude: ['pin'] } }],
      attributes: { exclude: ['password'] },
    });
    if (!accountResponse) {
      throw new HttpException('User is not a found', HttpStatus.NOT_FOUND);
    }
    return accountResponse;
  }

  async updatePassword(dto: UpdatePasswordDto, account: Accounts) {
    const candidate = await this.accountsRepository.findOne({ where: { id: account.id } });
    if (!candidate) {
      throw new HttpException('User is not a found', HttpStatus.NOT_FOUND);
    }
    const decodePassword = await bcrypt.compare(dto.currentPassword, candidate.password);
    if (!decodePassword) {
      throw new HttpException('Password is not a valid', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 7);
    candidate.password = hashPassword;
    await candidate.save();
    return 'success';
  }


}
