-- CreateTable
CREATE TABLE "comments_ocult" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_ocult_pkey" PRIMARY KEY ("id")
);
