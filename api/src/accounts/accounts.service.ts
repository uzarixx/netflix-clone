import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Accounts } from './accounts.model';
import { InjectModel } from '@nestjs/sequelize';
import { TokenService } from '../token/token.service';

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
      attributes: { exclude: ['password'] },
    });
    account.twoFactor = false;
    await account.save();
    return account;
  }


}
