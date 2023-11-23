import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Headers, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProductsCategories } from '@prisma/client';
import { UserByToken } from 'src/session/auth';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/products/edit-file-name.util';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ImagesCategoryService } from './images_category.service';
import { PrismaService } from 'src/database/prisma.service';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly auth: UserByToken,
    private imagesCategory: ImagesCategoryService,
    private readonly prisma: PrismaService
  ) { }

  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './uploads', // Diretório onde os arquivos serão salvos
        filename: editFileName,
      }),
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createCategoryDto: CreateCategoryDto,
    @Headers() headers
  ) {
    try {
      const { data } = createCategoryDto
      console.log(`tipo do data`, typeof data)
      const authorization = headers.authorization || ''


      const [, token] = authorization.split(' ')

      await this.auth.checkToken(token)

      if (!files.length) throw new HttpException(`Please send image`, HttpStatus.BAD_REQUEST)

      const file = files[0]

      const category = await this.categoryService.create(data);
      await this.imagesCategory.create({ file, category_id: category.id })

      const result = await this.prisma.productsCategories.findFirst({ where: { id: category.id } })

      return result
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: CreateCategoryDto) {
    try {
      const { data } = updateCategoryDto
      return await this.categoryService.update(id, data);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
