import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Content } from './content.model';
import { ContentCreateDto } from './dto/content-create.dto';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category.model';
import { Films } from '../films/films.model';

@Injectable()
export class ContentService {
  constructor(@InjectModel(Content) private contentRepository: typeof Content, private categoryService: CategoryService) {
  }

  async createContent(dto: ContentCreateDto) {
    const content = await this.contentRepository.create({
      name: dto.name,
      publicationDate: dto.publicationDate,
      yearCategory: dto.yearCategory,
      isFilm: dto.isFilm,
      description: dto.description,
      rating: dto.rating,
      previewImage: dto.previewImage,
      previewVideo: dto.previewVideo,
    });
    const category = await this.categoryService.getCategory(dto.category);
    const data = category.map((el) => ({ categoryId: el.id, contentId: content.id }));
    await this.categoryService.createCategoryOfContent(data);
    return content;
  }

  async findContentFilmById(id: number) {
    const content = await this.contentRepository.findOne({ where: { id }, include: [{ model: Films }] });
    if (content.films.length >= 1) {
      throw new HttpException('Limit to add film', HttpStatus.BAD_REQUEST);
    }
    return content;
  }

  async getFilmByContentId(id: number) {
    const { films } = await this.contentRepository.findOne({ where: { id }, include: [{ model: Films }] });
    return films;
  }

  async getContent() {
    const [action, drama] = await Promise.all([
        this.contentRepository.findAll({
          include: [
            {
              model: Category,
              attributes: ['id', 'param'],
              where: { param: 'action' },
            },
          ],
        }),
        this.contentRepository.findAll({
          include: [
            {
              model: Category,
              attributes: ['id', 'param'],
              where: { param: 'drama' },
            },
          ],
        }),
      ],
    );
    return { action, drama };
  }
}
