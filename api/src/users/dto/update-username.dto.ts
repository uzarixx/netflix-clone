import { IsNumber, IsString } from 'class-validator';

export class UpdateUsernameDto {
  @IsString({message: 'Is not a string'}, )
  readonly username: string;
  @IsNumber({}, {message: 'Is not a number'})
  readonly userId: number
}