import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { isUnique } from 'src/common/validators/IsUniqueValidator/is-unique.decorator';

export class UpdateUserOutputDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O campo E-mail não pode está vázio' })
  @IsString({ message: 'o campo nome deve ser uma string' })
  @ApiProperty({
    example: 'Juvenal Juvenelson',
    required: false,
  })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O campo E-mail não pode está vázio' })
  @IsEmail({}, { message: 'Insira um E-mail válido' })
  @isUnique({ modelName: 'users', propertyName: 'email' })
  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: false,
  })
  email: string;
}
