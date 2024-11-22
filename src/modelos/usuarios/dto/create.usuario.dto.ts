import {IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsEmail()
    correo: string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @Transform(({ value }) => value.trim())
    password: string

    @IsOptional()
    @IsString()
    role?: string

    @IsOptional()
    @IsDate()
    fechaborrado?: Date
}
