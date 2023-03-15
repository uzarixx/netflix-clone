import { IsJWT, IsString } from 'class-validator';

export class GetUserDto {
  @IsJWT({message: 'Is not a JWT'})
  readonly token: string;
}