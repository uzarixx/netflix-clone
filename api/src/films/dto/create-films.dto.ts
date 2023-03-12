import { IsNumber, IsString } from 'class-validator';

export class CreateFilmsDto {
  @IsNumber({}, { message: 'Is not a number' })
  readonly contentId: number;
  @IsString({ message: 'Is not a string' })
  readonly videoLink: string;
  @IsNumber({}, { message: 'Is not a number' })
  readonly length: number;
}