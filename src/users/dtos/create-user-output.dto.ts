import { ApiProperty } from '@nestjs/swagger';

export class CreateUserOutputDTO {
  id: string;
  @ApiProperty({
    description: 'Juvenal Juvenelson',
    example: 'Nome do usuário cadastrado',
  })
  name: string;
  @ApiProperty({
    description: 'E-mail do usuário cadastrado',
    example: 'rehmat.sayani@gmail.com',
  })
  email: string;
  createdAt: Date;
}
