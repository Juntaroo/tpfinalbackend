import { Module } from '@nestjs/common';
import { UsersModule } from './modelos/usuarios/users.module';
import { AuthModule } from './modelos/auth/auth.module'
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modelos/productos/products.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
