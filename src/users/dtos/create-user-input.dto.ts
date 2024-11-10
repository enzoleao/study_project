import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { isUnique } from 'src/common/validators/is-unique-validator/is-unique.decorator';

export class CreateUserInputDTO {
  @IsNotEmpty({ message: 'O campo nome não pode está vázio' })
  @IsString({ message: 'Digite um nome válido' })
  @ApiProperty({
    example: 'Juvenal Juvenelson',
    required: true,
  })
  firstName: string;

  @IsNotEmpty({ message: 'O sobrenome não pode está vázio' })
  @IsString({ message: 'Digite um sobrenome válido' })
  @ApiProperty({
    example: 'Juvenal Juvenelson',
    required: true,
  })
  lastName: string;

  @IsNotEmpty({ message: 'O campo E-mail não pode está vázio' })
  @IsEmail({}, { message: 'Insira um E-mail válido' })
  @isUnique({ modelName: 'users', propertyName: 'email' })
  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  email: string;

  @IsNotEmpty({ message: 'O campo Senha não pode está vázio' })
  @IsString({ message: 'Digite uma senha valida' })
  @ApiProperty({
    example: 'teste!teste',
    required: true,
  })
  password: string;
}
