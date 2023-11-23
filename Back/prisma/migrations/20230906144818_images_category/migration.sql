-- CreateTable
CREATE TABLE "images_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "category_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "images_category_id_key" ON "images_category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "images_category_category_id_key" ON "images_category"("category_id");

-- AddForeignKey
ALTER TABLE "images_category" ADD CONSTRAINT "images_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "products_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
