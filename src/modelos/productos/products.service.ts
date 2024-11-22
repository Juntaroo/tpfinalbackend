import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create.producto.dto';
import { UpdateProductDto } from './dto/update.producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService){}

  async create(createProductDto: CreateProductDto)  {
    return await this.prisma.product.create({data: createProductDto})
  }

  async update(id: number, updateUserDto: Partial<UpdateProductDto>, getDeletes?: boolean) {
    const product = await this.findProduct(id, getDeletes);
    return await this.prisma.product.update({ where: { id }, data: updateUserDto });
  }

  async findProduct(id: number, getDeletes?: boolean) : Promise<CreateProductDto>{
    const where = { id, fechaborrado: null };
    if (getDeletes) delete where['fechaborrado'];
    const product = await this.prisma.product.findFirst({where});
    if (!product) throw new NotFoundException('Producto no encontrado');

    return product;
  }
  async findAll() :  Promise<CreateProductDto[]> {
    const product = await this.prisma.product.findMany()
    if(product.length === 0) throw new NotFoundException('No se encontraron')

    return product;
  }

  async restore(id: number) {
    const product = await this.update(id, { fechaborrado: null }, true);
    return product;
  }

  async remove(id: number) {
    const product = await this.findProduct(id, false)
    await this.update(id, { fechaborrado: new Date() });
    return `#${product.nombre} ha sido eliminado`;
  }
}
