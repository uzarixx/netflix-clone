import { IsEmail } from 'class-validator';

export class CreateForgotTokenDto {
  @IsEmail({}, { message: 'Is not a email' })
  readonly email: string;
}