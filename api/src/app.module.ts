import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';
import * as process from 'process';
import { Users } from './users/users.model';
import { Accounts } from './accounts/accounts.model';
import { TokenModule } from './token/token.module';
import { Tokens } from './token/token.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(
        process.env.POSTGRES_PORT,
      ),
      username:
      process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Users, Accounts, Tokens],
      autoLoadModels: true,
      logging: false,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    }),
    AuthModule,
    AccountsModule,
    UsersModule,
    TokenModule,
  ],
})
export class AppModule {
}
