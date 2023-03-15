import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Content } from './content.model';
import { ContentCreateDto } from './dto/content-create.dto';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category.model';
import { Films } from '../films/films.model';
import { Seasons } from '../series/seasons.model';
import { Episodes } from '../series/episodes.model';
import { Sequelize } from 'sequelize';

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

  async getContentById(id: number) {
    const result = await this.contentRepository.findOne({
      where: { id },
      include: [{ model: Films }, { model: Seasons, include: [{ model: Episodes }] }],
    });
    return result;
  }

  async getRandomFilm() {
    const result = await this.contentRepository.findAll({
      where: { isFilm: true },
      attributes: ['id'],
    });
    const randomId = (id: Content[]) => {
      return id[Math.floor(Math.random() * id.length)];
    };
    const number = randomId(result);
    const film = await this.contentRepository.findOne({
      where: { id: number.id },
    });
    return film;
  }

  async getContent() {
    const [action, drama] = await Promise.all([
        this.getCategory('action'),
        this.getCategory('drama'),
      ],
    );
    return { action, drama };
  }

  private getCategory(param: string) {
    const result = this.contentRepository.findAll({
      include: [
        {
          model: Category,
          attributes: ['id', 'param'],
          where: { param },
        },
      ],
    });
    return result;
  }

  async findContentSeriesById(id: number) {
    const content = await this.contentRepository.findOne({ where: { id }, include: [{ model: Seasons }] });
    return content;
  }
}
