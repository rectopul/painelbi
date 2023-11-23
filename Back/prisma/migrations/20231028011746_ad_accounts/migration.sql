-- CreateTable
CREATE TABLE "AdAccount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "facebook_id" INTEGER NOT NULL,

    CONSTRAINT "AdAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdAccount_account_id_key" ON "AdAccount"("account_id");

-- AddForeignKey
ALTER TABLE "AdAccount" ADD CONSTRAINT "AdAccount_facebook_id_fkey" FOREIGN KEY ("facebook_id") REFERENCES "FacebookProfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
