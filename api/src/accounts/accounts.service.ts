import { Injectable } from '@nestjs/common';
import { Accounts } from './accounts.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AccountsService {

  constructor(@InjectModel(Accounts) private accountsRepository: typeof Accounts) {
  }

  async getAccountByEmail(email: string) {
    const user = await this.accountsRepository.findOne({ where: { email } });
    return user;
  }

  async getAccountById(id: number) {
    const user = await this.accountsRepository.findOne({where: {id}})
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


}
