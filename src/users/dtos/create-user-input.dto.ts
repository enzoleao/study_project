import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserInputDto {
  @IsNotEmpty({ message: 'O campo E-mail não pode está vázio' })
  @IsString({ message: 'o campo nome deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'O campo E-mail não pode está vázio' })
  @IsEmail({}, { message: 'Insira um E-mail válido' })
  email: string;

  @IsNotEmpty({ message: 'O campo Senha não pode está vázio' })
  @IsString({ message: 'o campo senha deve ser uma string' })
  password: string;
}
