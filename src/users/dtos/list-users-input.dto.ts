import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ListUsersInputDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return parseInt(value, 10);
    }
    return value;
  })
  @ApiProperty({
    example: 1,
    required: false,
  })
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return parseInt(value, 10);
    }
    return value;
  })
  @ApiProperty({
    example: 10,
    required: false,
  })
  perPage?: number;

  @IsOptional()
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  id?: string;

  @IsOptional()
  @ApiProperty({
    example: 'Juvenal Juvenio',
    required: false,
  })
  firstName?: string;

  @IsOptional()
  @ApiProperty({
    example: 'admin@admin.com.br',
    required: false,
  })
  email?: string;
}
