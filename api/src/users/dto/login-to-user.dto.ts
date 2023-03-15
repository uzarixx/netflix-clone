import { IsNumber } from 'class-validator';

export class LoginToUserDto {
  @IsNumber({}, {message: 'Is not a number'})
  readonly userId: number
  @IsNumber({}, {message: 'Is not a number'})
  readonly pin: number

}