import { Body, Controller, Post } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { SeriesService } from './series.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';

@Controller('series')
export class SeriesController {
  constructor(private seriesService: SeriesService) {
  }

  @Post('/create-season')
  createSeason(@Body() dto: CreateSeasonDto) {
    return this.seriesService.createSeason(dto);
  }

  @Post('/create-episode')
  createEpisode(@Body() dto: CreateEpisodeDto) {
    return this.seriesService.createEpisode(dto);
  }

}