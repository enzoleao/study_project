import { Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Query, UseGuards } from '@nestjs/common';
import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { RolesHasPermissionsInputDto } from '../dtos/roles-has-permission-input.dto';
import { RolesHasPermissionsUseCase } from '../use-cases/roles-has-permissions/roles-has-permissions.usecase';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesHasPermissionOutputDTO } from '../dtos/roles-has-permission-output.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesHasPermissionUseCase: RolesHasPermissionsUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiPaginatedResponse(RolesHasPermissionOutputDTO)
  @Get('role-has-permissions')
  async index(
    @Query() rolesHasPermissionInputDto: RolesHasPermissionsInputDto,
  ): Promise<PaginatedOutputDto<RolesHasPermissionOutputDTO>> {
    const { rolesHasPermissionOutputDto } =
      await this.rolesHasPermissionUseCase.execute({
        rolesHasPermissionInputDto,
      });

    return rolesHasPermissionOutputDto;
  }
}
