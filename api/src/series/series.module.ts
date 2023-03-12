import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Seasons } from './seasons.model';
import { Episodes } from './episodes.model';
import { ContentModule } from '../content/content.module';

@Module({
  providers: [SeriesService],
  controllers: [SeriesController],
  imports: [SequelizeModule.forFeature([Seasons, Episodes]), ContentModule],
})
export class SeriesModule {
}
