import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.usuario.dto';
import { UpdateUserDto } from './dto/update.usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //funcion para hacer el hash de la contraseña
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  //funcion para verificar la contraseña
  private async checkPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return this.checkPassword(plainPassword, hashedPassword);
  }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const { correo } = createUserDto;
  
    //verifico si el usuario existe antes de realizar el hash
    const user = await this.prisma.user.findUnique({ where: { correo } });
    if (user) throw new BadRequestException('El usuario ya existe');
  
    //hasheo la contraseña después de validar
    createUserDto.password = await this.hashPassword(createUserDto.password);
  
    //creo el usuario
    return await this.prisma.user.create({ data: { ...createUserDto } });
  }

  async update(id: number, updateUserDto: Partial<UpdateUserDto>, getDeletes?: boolean) {
    const user = await this.findUser(id, getDeletes);

    //evito errores cuando se utiliza el mismo correo dos veces
    if (updateUserDto.correo !== undefined) {
      const isUsed = await this.prisma.user.findFirst({
        where: {
          correo: updateUserDto.correo,
          id: { not: id }, // Asegurar que no sea el mismo usuario
        },
      });
      if (isUsed) throw new BadRequestException('El correo ya está en uso');
    }

    return await this.prisma.user.update({ where: { id }, data: updateUserDto });
  }
  

  async findUser(id: number, getDeletes?: boolean): Promise<CreateUserDto> {
    const where = { id, fechaborrado: null };
    if (getDeletes) delete where['fechaborrado'];
    const user = await this.prisma.user.findFirst({ where });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  async findByCorreo(correo: string, getDeletes?: boolean): Promise<CreateUserDto> {
    const where = { correo, fechaborrado: null };
    if (getDeletes) delete where['fechaborrado'];
    const user = await this.prisma.user.findFirst({ where });
    if (!user) throw new NotFoundException('Usuario no encotrado');

    return user;
  }

  async findAll(): Promise<CreateUserDto[]> {
    const users = await this.prisma.user.findMany({ where: { fechaborrado: null } });

    if (users.length === 0) throw new NotFoundException('No se encontraron usuarios');

    return users;
  }

  async changeToUser(id: number) {
    const user = await this.update(id, { role: 'user' }, false);
    return user;
  }

  async changeToAdmin(id: number) {
    const user = await this.update(id, { role: 'admin' }, false);
    return user;
  }

  async restore(id: number) {
    const user = await this.update(id, { fechaborrado: null }, true);
    return user;
  }

  async remove(id: number) {
    const user = await this.findUser(id, false);
    if (user.fechaborrado) {
      throw new BadRequestException(`El usuario #${user.correo} ya está eliminado`);
    }
    await this.update(id, { fechaborrado: new Date() });
    return `#${user.correo} ha sido eliminado`;
  }
}
