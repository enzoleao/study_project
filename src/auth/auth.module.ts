import { Module } from '@nestjs/common';
import { IUserRepository } from 'src/users/repositories/implementations/user.repository';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { AuthUseCase } from './use-cases/auth.usecase';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [
    {
      provide: UsersRepository,
      useClass: IUserRepository,
    },
    AuthUseCase,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
