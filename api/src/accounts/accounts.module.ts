import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Accounts } from './accounts.model';

@Module({
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService],
  imports: [SequelizeModule.forFeature([Accounts])],
})
export class AccountsModule {
}
