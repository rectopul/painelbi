import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProductsCategories } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: ProductsCategories): Promise<ProductsCategories> {
    try {
      if (!data) throw new Error(`Informe os dados`)

      console.log(`dados recebidos `, data)

      const category = await this.prisma.productsCategories.create({ data })

      const result = await this.prisma.productsCategories.findFirst({ where: { id: category.id }, include: { parent: true } })

      return result
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll(): Promise<ProductsCategories[]> {
    try {
      const categories = await this.prisma.productsCategories.findMany({
        include: {
          Products: { include: { ProductsImages: true } },
          image: true,
          parent: true
        }
      })

      return categories
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id: string): Promise<ProductsCategories> {
    try {
      const category = await this.prisma.productsCategories.findFirst({ where: { id } })

      return category
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: string, updateCategoryDto: ProductsCategories): Promise<ProductsCategories> {
    try {
      const check = await this.prisma.productsCategories.findFirst({ where: { id } })

      if (!check) throw new Error(`Categoria não existe`)

      const category = await this.prisma.productsCategories.update({ where: { id }, data: updateCategoryDto })

      return category
    } catch (error) {
      console.log(`erro ao atualizar categoria`, error?.message)
      throw new Error(error)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
