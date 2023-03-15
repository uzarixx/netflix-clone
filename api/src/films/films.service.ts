import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Films } from './films.model';
import { CreateFilmsDto } from './dto/create-films.dto';
import { ContentService } from '../content/content.service';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Films) private filmsRepository: typeof Films, private contentService: ContentService) {
  }

  async createFilm(dto: CreateFilmsDto) {
    const content = await this.contentService.findContentFilmById(dto.contentId);
    if (!content || !content.isFilm) {
      throw new HttpException('Content is not a found', HttpStatus.NOT_FOUND);
    }
    const film = await this.filmsRepository.create(dto);
    return film;
  };
}
