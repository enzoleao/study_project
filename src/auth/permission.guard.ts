import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/common/database/prisma.service';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}
  private readonly rolesHasPermissionsRepository =
    this.prismaService.rolesHasPermissions;

  matchPermissions(roles: string[], userRole: any) {
    return roles.some((role) => role === userRole);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!permission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userPermissions = await this.rolesHasPermissionsRepository.findMany({
      where: {
        roleId: user.roleId,
      },
      include: {
        permission: true,
      },
    });

    return this.matchPermissions(permission, userPermissions);
  }
}
