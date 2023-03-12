import { IsString } from 'class-validator';

export class DeleteUserDto {
  @IsString({ message: 'Is not a string' })
  readonly password: string;
}