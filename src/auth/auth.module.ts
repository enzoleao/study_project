import { Module } from '@nestjs/common';
import { AuthUseCase } from './use-cases/auth/auth.usecase';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthUseCase, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
