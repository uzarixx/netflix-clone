import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Seasons } from './seasons.model';
import { Episodes } from './episodes.model';
import { CreateSeasonDto } from './dto/create-season.dto';
import { ContentService } from '../content/content.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Seasons) private seasonsRepository: typeof Seasons,
    @InjectModel(Episodes) private episodesRepository: typeof Episodes,
    private contentService: ContentService,
  ) {
  }

  async createSeason(dto: CreateSeasonDto) {
    const content = await this.contentService.findContentSeriesById(dto.contentId);
    if (!content || content.isFilm) {
      throw new HttpException('Content is not a found', HttpStatus.NOT_FOUND);
    }
    const series = await this.seasonsRepository.create(dto);
    return series;
  }

  async createEpisode(dto: CreateEpisodeDto) {
    const season = await this.seasonsRepository.findOne({ where: { id: dto.seasonId } });
    if (!season || season.numberSeason !== dto.numberSeason) {
      throw new HttpException('Season is not a found', HttpStatus.NOT_FOUND);
    }
    const episode = await this.episodesRepository.create({
      name: dto.name,
      numberSeason: dto.numberSeason,
      seasonId: dto.seasonId,
      description: dto.description,
      numberEpisode: dto.numberEpisode,
      videoLink: dto.videoLink,
      length: dto.length,
      imageLink: dto.imageLink,
    });
    return episode;
  }
}
