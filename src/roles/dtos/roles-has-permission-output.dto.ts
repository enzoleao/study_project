import { ApiProperty } from '@nestjs/swagger';
import { Permissions, Roles } from '@prisma/client';

export class RolesHasPermissionOutputDTO {
  @ApiProperty({
    example: 1,
    required: false,
  })
  roleId: number;
  @ApiProperty({
    example: 1,
    required: false,
  })
  permissionId: number;
  role?: Roles;
  permission?: Permissions;
}
