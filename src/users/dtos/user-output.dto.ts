import { ApiProperty } from '@nestjs/swagger';

export class UserOutputDTO {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  id: string;
  @ApiProperty({
    example: 'Juvenal Juvenelson',
    required: false,
  })
  name: string;
  @ApiProperty({
    example: 'admin@admin.com.br',
    required: false,
  })
  email: string;
  @ApiProperty({
    example: 1,
    required: false,
    type: Number,
  })
  roleId: number;
  @ApiProperty({
    example: '2024-03-18T23:12:35.014Z',
    required: false,
    type: Date,
  })
  createdAt: Date;
  @ApiProperty({
    example: '2024-03-18T23:12:35.014Z',
    required: false,
    type: Date,
  })
  updatedAt: Date | null;
  @ApiProperty({
    example: '2024-03-18T23:12:35.014Z',
    required: false,
  })
  deletedAt: Date | null;
}
