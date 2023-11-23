import { Injectable } from "@nestjs/common";
import { ImagesCategory } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";

interface ImagesCategoryType {
    file: Express.Multer.File
    category_id: string
}

@Injectable()
export class ImagesCategoryService {
    constructor(private readonly prisma: PrismaService) { }

    async create({ file, category_id }: ImagesCategoryType): Promise<ImagesCategory> {
        try {
            const { filename: name, size } = file
            const image = await this.prisma.imagesCategory.create({ data: { name, size, category_id } })
            return image
        } catch (error) {
            throw new Error(error)
        }
    }
}