import { Module } from '@nestjs/common';
import { PrismaModule } from './common/database/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RolesController } from './roles/controller/roles.controller';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    RolesModule,
  ],
  controllers: [RolesController],
})
export class AppModule {}
