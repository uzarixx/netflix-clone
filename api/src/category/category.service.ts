import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { CategoryOfContent } from './category-of-content.model';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    @InjectModel(CategoryOfContent) private categoryOfContentRepository: typeof CategoryOfContent) {
  }

  async getCategory(dto: string[]) {
    const role = await this.categoryRepository.findAll({ where: { param: dto } });
    return role;
  }

  async createCategoryOfContent(dto: { categoryId: number, contentId: number }[]) {
    const category = await this.categoryOfContentRepository.bulkCreate(dto);
    return category;
  }
}
