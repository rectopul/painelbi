-- CreateTable
CREATE TABLE "campaigns" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "special_ad_categories" TEXT NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adsets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "campaign_id" INTEGER NOT NULL,
    "daily_budget" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "targeting" TEXT NOT NULL,

    CONSTRAINT "adsets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adsets" ADD CONSTRAINT "adsets_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
