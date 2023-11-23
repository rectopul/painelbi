-- CreateTable
CREATE TABLE "Ads" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ad_active_time" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "spend" TEXT NOT NULL,
    "date_start" TEXT NOT NULL,
    "date_stop" TEXT NOT NULL,
    "unic_code" TEXT NOT NULL,
    "adAccountId" INTEGER NOT NULL,

    CONSTRAINT "Ads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ads_unic_code_key" ON "Ads"("unic_code");

-- AddForeignKey
ALTER TABLE "Ads" ADD CONSTRAINT "Ads_adAccountId_fkey" FOREIGN KEY ("adAccountId") REFERENCES "AdAccount"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
