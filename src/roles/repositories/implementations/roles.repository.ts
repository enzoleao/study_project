import { Injectable } from '@nestjs/common';
import { RolesRepository } from '../roles.repository';
import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { IRolesHasPermissionsFilter } from 'src/roles/interfaces/roles-has-permission.interface';
import { createPaginator } from 'prisma-pagination';
import { RolesHasPermissionOutputDTO } from 'src/roles/dtos/roles-has-permission-output.dto';

@Injectable()
export class IRolesRepository implements RolesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly rolesHasPermissionRepository =
    this.prismaService.rolesHasPermissions;

  async findRolesPermissions(
    filters: IRolesHasPermissionsFilter,
  ): Promise<PaginatedOutputDto<RolesHasPermissionOutputDTO>> {
    const where: Prisma.RolesHasPermissionsFindManyArgs['where'] = {};
    for (const key in filters) {
      if (key != 'page' && key != 'perPage') {
        const value = Number(filters[key]);
        where[key] = !isNaN(value) ? value : filters[key];
      }
    }
    const paginate = createPaginator({ perPage: filters.perPage ?? 10 });
    return paginate<
      RolesHasPermissionOutputDTO,
      Prisma.RolesHasPermissionsFindManyArgs
    >(
      this.rolesHasPermissionRepository,
      {
        where,
        orderBy: {
          roleId: 'desc',
        },
        include: {
          permission: true,
        },
      },
      {
        page: filters.page ?? 1,
      },
    );
  }
}
