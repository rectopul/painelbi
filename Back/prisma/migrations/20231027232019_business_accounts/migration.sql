-- CreateTable
CREATE TABLE "BusinessAccount" (
    "id" SERIAL NOT NULL,
    "access_token" TEXT NOT NULL,
    "unic_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "facebook_account" INTEGER NOT NULL,

    CONSTRAINT "BusinessAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessAccount_access_token_key" ON "BusinessAccount"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessAccount_unic_code_key" ON "BusinessAccount"("unic_code");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessAccount_business_id_key" ON "BusinessAccount"("business_id");

-- AddForeignKey
ALTER TABLE "BusinessAccount" ADD CONSTRAINT "BusinessAccount_facebook_account_fkey" FOREIGN KEY ("facebook_account") REFERENCES "FacebookProfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
