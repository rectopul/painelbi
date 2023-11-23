import { Controller, Delete, Headers, HttpException, HttpStatus, Param, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName } from "./edit-file-name.util";

@Controller('product-images')
export class ProductImagesController {

    constructor(private readonly productsService: ProductsService) { }

    @Post(':product_id')
    @UseInterceptors(
        FilesInterceptor('files', 20, {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName
            })
        })
    )
    async Insert(
        @UploadedFiles() files: Express.Multer.File[],
        @Headers() headers,
        @Param('product_id') product_id: string
    ) {
        try {
            const authorization = headers.authorization || ``

            const [, token] = authorization.split(' ')

            return await this.productsService.imageAdd({ data: { files, id: product_id, token } })
        } catch (error) {
            console.log(`erro ao adicionar imagem de produto`, error)
            throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return await this.productsService.imageRemove(id)
        } catch (error) {
            console.log(`erro ao deletar imagem de produto`, error)
            throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
        }
    }
}