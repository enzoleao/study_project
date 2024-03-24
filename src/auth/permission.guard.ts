import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesHasPermissionsUseCase } from 'src/roles/use-cases/roles-has-permissions/roles-has-permissions.usecase';
import { PermissionArgument } from './permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly rolesHasPermissionsUseCase: RolesHasPermissionsUseCase,
  ) {}

  async matchPermissions(role: number, permissionRequired: any[]) {
    const usersPermissions = await this.rolesHasPermissionsUseCase.execute({
      rolesHasPermissionInputDto: { roleId: role },
    });

    return usersPermissions.rolesHasPermissionOutputDto.data.some(
      (i) => i.permission.name === permissionRequired[0],
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get<PermissionArgument>(
      'permissions',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const { user, body } = request;

    const hasExclusivePropriety = permission.fields.some((p) =>
      body.hasOwnProperty(p.proprietyName),
    );
    if (
      !permission.permissions ||
      (request.params.id === user.userId && !hasExclusivePropriety)
    ) {
      return true;
    }
    return this.matchPermissions(user.role.id, permission.permissions);
  }
}
