import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateInputDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
