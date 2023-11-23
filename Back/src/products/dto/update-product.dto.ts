import { ProductsImages } from '@prisma/client'

interface FilesTypes {
    name: string
    size: number
    productsId: string
}

export class UpdateProductDto {
    id?: string
    name: string
    price: string
    promotion_price: string | null
    category_id: string
    ProductImages?: ProductsImages[]
    files?: FilesTypes[]
}
