import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Is not a string' })
  readonly username: string;

}