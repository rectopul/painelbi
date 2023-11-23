import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserByToken } from 'src/session/auth';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProductImagesDto } from './dto/create-product-images.dto';
import { Products } from '@prisma/client';
import path from 'path';
import fs from 'fs'

interface PropsProduct {
  data: Products
  images: CreateProductImagesDto[]
  token: string
}

interface ProductImages {
  data: {
    id: string
    files: Express.Multer.File[]
    token: string
  }
}

@Injectable()
export class ProductsService {
  constructor(
    private readonly auth: UserByToken,
    private prisma: PrismaService
  ) { }

  async create({ data, token, images }: PropsProduct) {
    try {

      const auth = await this.auth.checkToken(token)

      if (!auth) return false

      const product = await this.prisma.products.create({ data })



      for (const image of images) {
        const create = await this.prisma.productsImages.create({
          data: {
            name: image.name,
            size: image.size,
            productsId: product.id
          }
        })
      }

      const result = await this.prisma.products.findFirst({
        where: { id: product.id },
        include: { ProductsImages: true, category: true }
      })

      return result

    } catch (error) {
      console.log("Erro ao cadastrar produto", error)
      throw new Error("Erro ao cadastrar produto")
    }
  }

  async findAll(): Promise<Products[]> {
    try {
      const products = await this.prisma.products.findMany({
        include: {
          ProductsImages: true,
          category: true
        }
      })

      return products
    } catch (error) {
      console.log("Erro ao cadastrar produto", error)
      throw new Error("Erro ao cadastrar produto")
    }
  }

  async findOne(id: string): Promise<Products> {
    try {
      const product = await this.prisma.products.findFirst({ where: { id } })

      return product
    } catch (error) {
      console.log("Erro ao selecionar produto", error)
      throw new Error("Erro ao cadastrar produto")
    }
  }

  async update(id: string, updateProduct: UpdateProductDto, token: string): Promise<Products> {
    try {
      const isAuth = await this.auth.checkToken(token)

      if (!isAuth) throw new Error("Falha na autenticação!")

      const check = await this.prisma.products.findFirst({ where: { id } })

      if (!check) throw new Error("Produto não existe!")

      const data = updateProduct

      delete data.files

      const update = await this.prisma.products.update({
        where: { id },
        data: data
      })

      const product = await this.prisma.products.findFirst({ where: { id } })

      return product

    } catch (error) {
      console.log("Erro ao atualizar produto", error)
      throw new Error("Erro ao cadastrar produto")
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async imageAdd({ data }: ProductImages) {
    try {
      const isAuth = this.auth.checkToken(data.token)

      if (!isAuth) throw new Error("Erro de autenticação")

      const product = this.prisma.products.findFirst({ where: { id: data.id } })

      if (!product) throw new Error("Produto não existe!")

      if (data.files.length) {
        for (const image of data.files) {
          const create = await this.prisma.productsImages.create({
            data: {
              name: image.filename,
              size: image.size,
              productsId: data.id
            }
          })
        }
      }

      const images = await this.prisma.productsImages.findMany({ where: { productsId: data.id } })

      return images

    } catch (error) {
      console.log("Erro ao adicionar imagem de produto", error)
      throw new Error("Erro ao cadastrar imagem")
    }
  }

  async imageRemove(id: string) {
    try {
      const image = await this.prisma.productsImages.findFirst({ where: { id } })
      const imagePath = path.join(__dirname, 'uploads', image.name)

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(`erro ao excluir imagem`, err)
          return
        }

        return { message: `Imagem ${image.name} excluida com sucesso!`, image }
      })

      return { message: `Imagem ${image.name} excluida com sucesso!`, image }

    } catch (error) {
      console.log("Erro ao deletar imagem de produto", error)
      throw new Error("Erro ao cadastrar produto")
    }
  }
}
