import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../usuarios/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto';
import { RegisterDto } from './dto/register-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register({ correo, password }: RegisterDto) {
    //verifico si el correo ya está registrado
    const userExists = await this.usersService.findByCorreo(correo).catch(() => null);
    if (userExists) {
      throw new UnauthorizedException('El correo ya esta registrado');
    }

    //creo usuario
    await this.usersService.create({ correo, password });
    return {
      message: 'Usuario creado exitosamente',
    };
  }

  async login({ correo, password }: LoginDto) {
    const user = await this.usersService.findByCorreo(correo);

    //se validan las credenciales
    if (!user || user.fechaborrado || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const payload = { correo: user.correo, role: user.role };

    //se genera el token JWT
    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      correo: user.correo,
    };
  }
}
