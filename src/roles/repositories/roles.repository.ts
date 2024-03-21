import { RolesHasPermissions } from '@prisma/client';
import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { IRolesHasPermissionsFilter } from '../interfaces/roles-has-permission.interface';

export abstract class RolesRepository {
  abstract findRolesPermissions(
    filters: IRolesHasPermissionsFilter,
  ): Promise<PaginatedOutputDto<RolesHasPermissions>>;
}
