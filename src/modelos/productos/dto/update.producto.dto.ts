import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create.producto.dto';
import { IsString, IsNumber, IsOptional, IsDate, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @IsString()
    nombre?: string

    @IsOptional()
    @IsNumber()
    @Min(0)
    precio?: number

    @IsOptional()
    @IsString()
    descripcion?: string

    @IsOptional()
    @IsNumber()
    cantidad: number

    @IsOptional()
    @IsDate()
    fechaborrado?: Date
}
