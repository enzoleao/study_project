import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/user.repository';
import { IUserRepository } from './repositories/implementations/user.repository';
import { UsersController } from './controller/users.controller';
import { CreateUserUseCase } from './use-cases/create-user/create-user.usecase';
import { ListUsersUseCase } from './use-cases/all-users/all-users.use.case';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [RolesModule],
  providers: [
    {
      provide: UsersRepository,
      useClass: IUserRepository,
    },
    CreateUserUseCase,
    ListUsersUseCase,
  ],
  controllers: [UsersController],
  exports: [UsersRepository],
})
export class UsersModule {}
