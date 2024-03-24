import { SetMetadata } from '@nestjs/common';

export interface PermissionArgument {
  permissions: string[];
  fields?: { proprietyName: string; required: boolean }[];
}

export const Permissions = (args: PermissionArgument) =>
  SetMetadata('permissions', args);
