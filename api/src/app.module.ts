import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';
import * as process from 'process';
import { Users } from './users/users.model';
import { Accounts } from './accounts/accounts.model';

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
      models: [Users, Accounts],
      autoLoadModels: true,
      logging: false,
    }),
    AuthModule,
    AccountsModule,
    UsersModule,

  ],
})
export class AppModule {
}
