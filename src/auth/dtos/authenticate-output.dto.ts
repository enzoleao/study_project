import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateUserOutputDTO {
  @ApiProperty({
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Juvenal',
      email: 'juvenal@admin.com.br',
      createdAt: '2024-03-18T23:12:35.014Z',
      updatedAt: '2024-03-18T23:12:35.014Z',
      deletedAt: '2024-03-18T23:12:35.014Z',
    },
    type: Object,
  })
  user: {
    id: string;
    name: string;
    email: string;
    password: undefined;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };
  @ApiProperty({
    example: {
      token:
        'AlbnpvcGluaGVpcm82QGdtYWlsLmNvbI6bnVsbCwicm9sZSINSOjE3MTEwMjgwMzR9.CRWsxYGwvfO3zQHpsxYvUw6gpv5fiXVfII2O8jfJSRk',
    },
    type: Object,
  })
  authorization: {
    token: string;
  };
}
