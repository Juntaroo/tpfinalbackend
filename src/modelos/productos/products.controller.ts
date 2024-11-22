import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create.producto.dto';
import { UpdateProductDto } from './dto/update.producto.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthRolGuard } from '../auth/guards/auth_rol.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('products')
@UseGuards(AuthGuard, AuthRolGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Post()
  @Roles('super','admin')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @Roles('super')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Get()
  @Roles('super','admin','user'  )
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles('super','admin','user' )
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findProduct(+id);
  }

  @Patch('restore/:id')
  @Roles('super','admin', )
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.restore(+id);
  }

  @Delete(':id')
  @Roles('super','admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(+id);
  }

  
}
