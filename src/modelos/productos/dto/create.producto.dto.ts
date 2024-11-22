import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"


export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    precio: number

    @IsNotEmpty()
    @IsString()
    descripcion: string

    @IsNotEmpty()
    @IsNumber()
    cantidad: number

    @IsOptional()
    @IsDate()
    fechaborrado?: Date
}
