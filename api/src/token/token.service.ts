import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Accounts } from '../accounts/accounts.model';
import { InjectModel } from '@nestjs/sequelize';
import { Tokens } from './token.model';
import * as uuid from 'uuid';
import { MailService } from '../services/mail/mail.service';
import { AccountsService } from '../accounts/accounts.service';
import { CreateForgotTokenDto } from './dto/create-forgot-token.dto';
import { VerifyForgotTokenDto } from './dto/verify-forgot-token.dto';

@Injectable()
export class TokenService {

  constructor(@InjectModel(Tokens) private tokensRepository: typeof Tokens, private mailService: MailService, @Inject(forwardRef(() => AccountsService)) private accountsService: AccountsService) {
  }


  async TFAToken(accounts: Accounts, isLogin: boolean) {
    const tokenGen = Math.floor(Math.random() * 9000 + 1000);
    const expiresAt = Date.now() + 1000 * 60 * 5;
    const { token } = await this.tokensRepository.create({
      userId: accounts.id,
      token: String(tokenGen),
      expiresAt: expiresAt,
      isVerify: false,
    });
    if (isLogin) {
      await this.mailService.twoFactorAuthentication(token, accounts.email);
    } else {
      await this.mailService.authToken(token, accounts.email);
    }
    return 'success';
  }

  async verifyToken(value: string) {
    const token = await this.tokensRepository.findOne({ where: { token: value } });
    if (!token || Number(token.expiresAt) < Date.now()) {
      throw new HttpException('Token is not a found', HttpStatus.BAD_REQUEST);
    }
    const account = await this.accountsService.updateIsVerify(token.userId);
    await this.tokensRepository.destroy({ where: { token: value } });
    return account;
  }

  async getTFAToken(token: string) {
    const tokenFind = await this.tokensRepository.findOne({ where: { token, isVerify: false } });
    if (!tokenFind || Number(tokenFind.expiresAt) < Date.now()) {
      throw new HttpException('Token is not a found', HttpStatus.BAD_REQUEST);
    }
    return tokenFind;
  }

  async disabledTwoFactorToken(token: string, account: Accounts) {
    const tokenCreate = await this.tokensRepository.create({
      userId: account.id,
      token,
      isVerify: false,
      expiresAt: Date.now() + 1000 * 60 * 5,
    });
    await this.mailService.twoFactorDisabled(tokenCreate.token, account.email);
    return tokenCreate;
  }

  async verifyDisabledTwoFactorToken(token: string) {
    const tokenFind = await this.tokensRepository.findOne({ where: { token } });
    if (!tokenFind || Number(tokenFind.expiresAt) < Date.now()) {
      throw new HttpException('Token is not a found', HttpStatus.BAD_REQUEST);
    }
    await this.tokensRepository.destroy({ where: { token } });
    return tokenFind;
  }


  async createForgotToken(dto: CreateForgotTokenDto) {
    const token = uuid.v4();
    const account = await this.accountsService.getAccountByEmail(dto.email);
    if (!account) {
      throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
    }
    await this.tokensRepository.create({
      userId: account.id,
      token,
      isVerify: false,
      expiresAt: Date.now() + 1000 * 60 * 5,
    });
    await this.mailService.forgotToken(`http://localhost:3000/reset-password?token=${token}`, dto.email);
    return 'success';
  }

  async verifyForgotToken(tokenValue: string) {
    const token = await this.tokensRepository.findOne({ where: { token: tokenValue } });
    if (!token || Number(token.expiresAt) < Date.now()) {
      throw new HttpException('Token is not a found', HttpStatus.BAD_REQUEST);
    }
    const account = await this.accountsService.getAccountById(token.userId);
    return account.email;
  }

  async findAccountByToken(token: string) {
    const tokenResult = await this.tokensRepository.findOne({ where: { token } });
    if (!tokenResult || Number(tokenResult.expiresAt) < Date.now()) {
      throw new HttpException('Token is not a found', HttpStatus.BAD_REQUEST);
    }
    return this.accountsService.getAccountById(tokenResult.userId);
  }

}
