import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Content } from './content.model';
import { CategoryModule } from '../category/category.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [ContentService],
  controllers: [ContentController],
  imports: [SequelizeModule.forFeature([Content]), CategoryModule, JwtModule],
  exports: [ContentService],
})
export class ContentModule {
}
