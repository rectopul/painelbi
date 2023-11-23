/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cards` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `AdAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Ads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `BusinessAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `FacebookProfiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `adsets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `planilha_resume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_account_id_fkey";

-- AlterTable
ALTER TABLE "AdAccount" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ads" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BusinessAccount" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FacebookProfiles" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "adsets" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "planilha_resume" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "account";

-- DropTable
DROP TABLE "cards";
