import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {//Creo el Dto del Regiter
  @IsEmail()//Se valida el campo del email
  correo: string;

  @IsString()
  @MinLength(4)
  @Transform(({ value }) => value.trim())//Elimino los espacios y establezco que la contrasenia tenga un minimo de 4 caracteres
  password: string;
}