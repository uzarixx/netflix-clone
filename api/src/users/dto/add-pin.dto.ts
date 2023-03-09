import { IsNumber, Max, Min } from 'class-validator';

export class AddPinDto {
  @IsNumber({}, { message: 'Is not a number' })
  @Min(1000)
  @Max(9999)
  pin: number;
  @IsNumber({}, { message: 'Is not a number' })
  userId: number;
}