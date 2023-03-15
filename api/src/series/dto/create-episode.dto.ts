import { IsNumber, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @IsNumber({}, { message: 'Is not a number' })
  readonly seasonId: number;
  @IsString({ message: 'Is not a string' })
  readonly name: string;
  @IsString({ message: 'Is not a string' })
  readonly description: string;
  @IsString({ message: 'Is not a string' })
  readonly videoLink: string;
  @IsNumber({}, { message: 'Is not a number' })
  readonly numberEpisode: number;
  @IsNumber({}, { message: 'Is not a number' })
  readonly numberSeason: number;
  @IsNumber({}, { message: 'Is not a number' })
  readonly length: number;
}