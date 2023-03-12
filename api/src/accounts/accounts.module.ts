import { forwardRef, Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Accounts } from './accounts.model';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from '../token/token.module';

@Module({
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService],
  imports: [SequelizeModule.forFeature([Accounts]), JwtModule, forwardRef(() => TokenModule)],
})
export class AccountsModule {
}
