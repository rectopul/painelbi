-- CreateTable
CREATE TABLE "FacebookProfiles" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "unic_code" TEXT NOT NULL,
    "name" TEXT,
    "status" TEXT,

    CONSTRAINT "FacebookProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FacebookProfiles_token_key" ON "FacebookProfiles"("token");

-- CreateIndex
CREATE UNIQUE INDEX "FacebookProfiles_unic_code_key" ON "FacebookProfiles"("unic_code");
