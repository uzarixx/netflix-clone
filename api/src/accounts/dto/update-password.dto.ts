import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString({message: 'Is not a string'})
  currentPassword: string;
  @IsString({message: 'Is not a string'})
  password: string;
}