import { IsUUID } from 'class-validator';

export class VerifyForgotTokenDto {
  @IsUUID(4, { message: 'Is not a token' })
  token: string;
}