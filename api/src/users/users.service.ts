import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { AddPinDto } from './dto/add-pin.dto';
import { Accounts } from '../accounts/accounts.model';
import { DeletePinDto } from './dto/delete-pin.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private usersRepository: typeof Users) {
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
    await user.update({ pin: dto.pin });
    await user.save();
    return user;
  }

  async deletePinUser(dto: DeletePinDto, accounts: Accounts) {
    const user = await this.usersRepository.findOne({ where: { accountId: accounts.id, id: dto.userId } });
    if (!user) {
      throw new HttpException('user is not a found', HttpStatus.NOT_FOUND);
    }
    await user.update({ pin: null });
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

}
