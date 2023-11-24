/*
  Warnings:

  - Added the required column `facebook_profile_id` to the `campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "facebook_profile_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_facebook_profile_id_fkey" FOREIGN KEY ("facebook_profile_id") REFERENCES "FacebookProfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
