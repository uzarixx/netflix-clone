import {
  IsEmail,
  IsString,
  Length
} from "class-validator";

export class AuthDto {

  @IsString({ message: "Is not a string" })
  @IsEmail({}, { message: "is not a email" })
  readonly email: string;
  @IsString({ message: "Is not a string" })
  @Length(4, 40, { message: "min length 4 and max 16" })
  readonly password: string;
}
