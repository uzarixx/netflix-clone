import {
  IsEmail,
  IsString,
  Length,
} from 'class-validator';

export class TwoFactorTokenDto {
  @IsString({ message: 'Is not a string' })
  @Length(4, 4, { message: 'Is not a valid' })
  readonly token: string;
}
