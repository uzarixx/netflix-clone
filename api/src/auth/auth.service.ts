import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from '../accounts/accounts.service';
import * as process from 'process';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { Accounts } from '../accounts/accounts.model';
import { TokenService } from '../token/token.service';
import { TwoFactorTokenDto } from './dto/two-factor-token.dto';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private accountsService: AccountsService,
    private tokenService: TokenService,
  ) {
  }

  async login(dto: AuthDto) {
    const account = await this.validateUser(dto);
    if (account.twoFactor) {
      await this.tokenService.TFAToken(account);
      throw new HttpException('To your email send auth-token', HttpStatus.PERMANENT_REDIRECT);
    }
    return this.generateToken(account);
  }

  async loginTwoFactor(dto: TwoFactorTokenDto) {
    const result = await this.tokenService.getTFAToken(dto.token);
    if (!result) {
      throw new HttpException('User is not a found', HttpStatus.FORBIDDEN);
    }
    const account = await this.accountsService.getAccountById(result.userId);
    return this.generateToken(account);
  }

  async registration(dto: AuthDto) {
    const candidate = await this.accountsService.getAccountByEmail(dto.email);
    if (candidate) {
      throw new HttpException('User with this email already exists', HttpStatus.FORBIDDEN);
    }
    const hashPassword = await bcrypt.hash(dto.password, 7);
    const account = await this.accountsService.createUser({ ...dto, password: hashPassword });
    await this.usersService.createUser({ username: dto.email.slice(0, 5) }, { id: account.id });
    await this.tokenService.createAuthToken(account);
    return this.generateToken(account);
  }

  private async generateToken(accounts: Accounts) {
    const payload = {
      email: accounts.email,
      id: accounts.id,
    };
    return {
      token: this.jwtService.sign(payload, { secret: process.env.PRIVATE_KEY }),
    };
  }

  private async validateUser(userDto: AuthDto) {
    const user = await this.accountsService.getAccountByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid data');
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException('Invalid data');
  }
}
