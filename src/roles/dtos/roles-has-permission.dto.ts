import { Permissions, Roles } from '@prisma/client';

export class RolesHasPermissionOutPutDto {
  roleId: number;
  permissionId: number;
  role?: Roles;
  permission?: Permissions;
}
