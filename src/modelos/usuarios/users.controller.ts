import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.usuario.dto';
import { UpdateUserDto } from './dto/update.usuario.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthRolGuard } from '../auth/guards/auth_rol.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard, AuthRolGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('super')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles('super')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('super')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUser(+id);
  }

  @Patch(':id')
  @Roles('super')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('user/:id')
  @Roles('super')
  changeToUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.changeToUser(+id);
  }

  @Patch('admin/:id')
  @Roles('super')
  changeToAdmin(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.changeToAdmin(+id);
  }

  @Patch('restore/:id')
  @Roles('super')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.restore(+id);
  }

  @Delete(':id')
  @Roles('super')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }

}
