import { Controller, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { RolesHasPermissionOutPutDto } from '../dtos/roles-has-permission.dto';
import { RolesHasPermissionsInputDto } from '../dtos/roles-has-permission-input.dto';
import { RolesHasPermissionsUseCase } from '../use-cases/roles-has-permissions/roles-has-permissions.usecase';
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesHasPermissionUseCase: RolesHasPermissionsUseCase,
  ) {}

  @Get()
  async index(
    @Query() rolesHasPermissionInputDto: RolesHasPermissionsInputDto,
  ): Promise<PaginatedOutputDto<RolesHasPermissionOutPutDto>> {
    const { rolesHasPermissionOutputDto } =
      await this.rolesHasPermissionUseCase.execute({
        rolesHasPermissionInputDto,
      });

    return rolesHasPermissionOutputDto;
  }
}
