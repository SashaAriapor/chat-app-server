/*
  Warnings:

  - You are about to drop the `Contect` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contect" DROP CONSTRAINT "Contect_authorId_fkey";

-- DropTable
DROP TABLE "Contect";

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "contactMail" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
