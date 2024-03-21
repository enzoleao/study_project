import { Injectable } from '@nestjs/common';
import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { RolesHasPermissionsInputDto } from 'src/roles/dtos/roles-has-permission-input.dto';
import { RolesHasPermissionOutputDTO } from 'src/roles/dtos/roles-has-permission-output.dto';
import { RolesRepository } from 'src/roles/repositories/roles.repository';

interface IRolesHasPermissionUseCaseInput {
  rolesHasPermissionInputDto: RolesHasPermissionsInputDto;
}
interface IRolesHasPermissionCaseOutput {
  rolesHasPermissionOutputDto: PaginatedOutputDto<RolesHasPermissionOutputDTO>;
}

@Injectable()
export class RolesHasPermissionsUseCase {
  constructor(private readonly rolesRepository: RolesRepository) {}
  async execute({
    rolesHasPermissionInputDto,
  }: IRolesHasPermissionUseCaseInput): Promise<IRolesHasPermissionCaseOutput> {
    const rolesHasPermission = await this.rolesRepository.findRolesPermissions(
      rolesHasPermissionInputDto,
    );
    return {
      rolesHasPermissionOutputDto: rolesHasPermission,
    };
  }
}
