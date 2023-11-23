import { ProductsCategories } from "@prisma/client"

export class CreateCategoryDto {
    image: File[]
    data: ProductsCategories
}
