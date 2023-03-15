import { IsNumber, IsString } from 'class-validator';

export class CreateSeasonDto {
  @IsString({ message: 'Is not a string' })
  readonly name: string;
  @IsNumber({}, { message: 'Is not a number' })
  readonly numberSeason: number;
  @IsNumber({}, { message: 'Is not a number' })
  readonly contentId: number;
}