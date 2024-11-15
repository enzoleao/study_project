import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { isUnique } from 'src/common/validators/is-unique-validator/is-unique.decorator';

export class UpdateUserInputDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O campo E-mail não pode está vázio' })
  @IsString({ message: 'o campo nome deve ser uma string' })
  @ApiProperty({
    example: 'Juvenal Juvenelson',
    required: true,
  })
  firstName: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O campo E-mail não pode está vázio' })
  @IsEmail({}, { message: 'Insira um E-mail válido' })
  @isUnique({ modelName: 'users', propertyName: 'email' })
  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  email: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O campo E-mail não pode está vázio' })
  @ApiProperty({
    example: '1',
    required: true,
  })
  @IsNumber({}, { message: 'O campo devera ser do tipo number' })
  roleId: number;

  @IsOptional()
  @IsNotEmpty({ message: 'O campo Senha não pode está vázio' })
  @IsString({ message: 'o campo senha deve ser uma string' })
  @ApiProperty({
    example: 'teste!teste',
    required: false,
  })
  password: string;
}
