import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RolesHasPermissionsInputDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return parseInt(value, 10);
    }
    return value;
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
  perPage?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 1,
    required: false,
    type: Number,
  })
  roleId?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 2,
    required: false,
    type: Number,
  })
  permissionId?: number;
}
