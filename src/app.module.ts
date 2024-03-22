import { Module } from '@nestjs/common';
import { PrismaModule } from './common/database/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from './roles/roles.module';
import { IsUniqueConstraint } from './common/validators/IsUniqueValidator/isUnique.class';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    RolesModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
