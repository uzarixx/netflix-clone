import { forwardRef, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { MailModule } from '../services/mail/mail.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tokens } from './token.model';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  providers: [TokenService],
  controllers: [TokenController],
  imports: [MailModule, SequelizeModule.forFeature([Tokens]), forwardRef(() => AccountsModule)],
  exports: [TokenService],
})
export class TokenModule {
}
