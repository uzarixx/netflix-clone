import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Seasons } from './seasons.model';
import { Episodes } from './episodes.model';

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Seasons) private seasonsRepository: typeof Seasons,
    @InjectModel(Episodes) private episodesRepository: typeof Episodes) {
  }
}
