/*
  Warnings:

  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `products_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products_images" DROP CONSTRAINT "products_images_productsId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "category_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products_images" ADD COLUMN     "category_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "products_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_images" ADD CONSTRAINT "products_images_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
