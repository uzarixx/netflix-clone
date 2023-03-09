import { IsNumber } from 'class-validator';

export class DeletePinDto {
  @IsNumber({}, { message: 'Is not a number' })
  readonly userId: number;
}