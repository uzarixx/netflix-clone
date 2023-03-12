import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class ContentCreateDto {
  @IsString({ message: 'Is not a string' })
  readonly name: string;
  @IsString({ message: 'Is not a string' })
  readonly description: string;
  @IsString({ message: 'Is not a string' })
  readonly publicationDate: string;
  @IsNumber({}, { message: 'Is not a string' })
  readonly rating: number;
  @IsString({ message: 'Is not a string' })
  readonly previewVideo: string;
  @IsString({ message: 'Is not a string' })
  readonly previewImage: string;
  @IsNumber({}, { message: 'Is not a string' })
  readonly yearCategory: number;
  @IsBoolean({ message: 'Is not a string' })
  readonly isFilm: boolean;
  @IsArray({ message: 'Is not a array' })
  readonly category: string[];
}