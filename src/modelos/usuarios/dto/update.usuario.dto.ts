import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.usuario.dto';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsEmail()
    correo?: string

    @IsOptional()
    @IsString()
    password?: string

    @IsOptional()
    @IsString()
    role?: string

    @IsOptional()
    @IsDate()
    fechaborrado?: Date
}
