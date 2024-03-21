import { Module } from '@nestjs/common';
import { IRolesRepository } from './repositories/implementations/roles.repository';
import { RolesHasPermissionsUseCase } from './use-cases/roles-has-permissions/roles-has-permissions.usecase';
import { RolesController } from './controller/roles.controller';
import { RolesRepository } from './repositories/roles.repository';

@Module({
  providers: [
    {
      provide: RolesRepository,
      useClass: IRolesRepository,
    },
    RolesHasPermissionsUseCase,
  ],
  controllers: [RolesController],
  exports: [RolesHasPermissionsUseCase],
})
export class RolesModule {}
