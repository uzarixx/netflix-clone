import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { ContentModule } from '../content/content.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Films } from './films.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [FilmsService],
  controllers: [FilmsController],
  imports: [SequelizeModule.forFeature([Films]), ContentModule, JwtModule],
})
export class FilmsModule {
}
