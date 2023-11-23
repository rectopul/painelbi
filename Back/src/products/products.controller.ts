import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFiles, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { diskStorage } from 'multer'
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileName } from './edit-file-name.util';
import { Products, ProductsImages } from '@prisma/client'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './uploads', // Diretório onde os arquivos serão salvos
        filename: editFileName,
      }),
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: Products,
    @Headers() headers
  ) {
    try {
      const authorization = headers.authorization || ''

      const [, token] = authorization.split(' ')

      const images = files.map(file => ({ name: file.filename, size: file.size }))

      const product = await this.productsService.create({ data, token, images })

      return product
    } catch (error) {
      console.log(`erro ao criar produto`, error)
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './uploads', // Diretório onde os arquivos serão salvos
        filename: editFileName,
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: Products,
    @Headers() headers
  ) {
    try {
      const authorization = headers.authorization || ''

      const [, token] = authorization.split(' ')
      return this.productsService.update(id, data, token);

    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
