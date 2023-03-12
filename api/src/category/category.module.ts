import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category.model';
import { CategoryOfContent } from './category-of-content.model';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [SequelizeModule.forFeature([Category, CategoryOfContent])],
  exports: [CategoryService],
})
export class CategoryModule {
}
