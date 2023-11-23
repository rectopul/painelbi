-- AlterTable
ALTER TABLE "products_categories" ADD COLUMN     "parent_id" TEXT;

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "products_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
