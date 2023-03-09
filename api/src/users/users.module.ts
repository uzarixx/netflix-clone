import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [SequelizeModule.forFeature([Users]), JwtModule],
})
export class UsersModule {
}
