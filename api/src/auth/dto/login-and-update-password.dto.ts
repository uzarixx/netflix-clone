import { IsString, IsUUID } from 'class-validator';

export class LoginAndUpdatePasswordDto {
  @IsUUID(4, { message: 'Is not a token' })
  token: string;
  @IsString({ message: 'Is not a string' })
  password: string;
}