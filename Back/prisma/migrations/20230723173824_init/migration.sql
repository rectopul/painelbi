/*
  Warnings:

  - You are about to drop the column `clientId` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `productsId` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the `Boletos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `facebooks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pix` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products_config` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `account_id` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Boletos" DROP CONSTRAINT "Boletos_productsId_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_clientId_fkey";

-- DropForeignKey
ALTER TABLE "attributes" DROP CONSTRAINT "attributes_productsId_fkey";

-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_clientId_fkey";

-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_productsId_fkey";

-- DropForeignKey
ALTER TABLE "facebooks" DROP CONSTRAINT "facebooks_productsId_fkey";

-- DropForeignKey
ALTER TABLE "pix" DROP CONSTRAINT "pix_productsId_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_productsId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoriesId_fkey";

-- DropForeignKey
ALTER TABLE "products_config" DROP CONSTRAINT "products_config_productsId_fkey";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "clientId",
DROP COLUMN "productsId",
ADD COLUMN     "account_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Boletos";

-- DropTable
DROP TABLE "address";

-- DropTable
DROP TABLE "attributes";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "clients";

-- DropTable
DROP TABLE "facebooks";

-- DropTable
DROP TABLE "pix";

-- DropTable
DROP TABLE "product_images";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "products_config";

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "agencia" TEXT NOT NULL,
    "conta" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sms" TEXT,
    "token" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
