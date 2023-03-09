import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule.register({
    signOptions: {
      expiresIn: '60d',
    },
  }), UsersModule, AccountsModule]
})
export class AuthModule {}
