import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../usuarios/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { envs } from 'src/configuration';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: envs.jwt_secreta,
    signOptions: { expiresIn: "20h" },
  }),],
  providers: [AuthService, UsersService, PrismaService],
  controllers: [AuthController]
})
export class AuthModule {}
