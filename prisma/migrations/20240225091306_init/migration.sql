/*
  Warnings:

  - You are about to drop the column `contect` on the `Contect` table. All the data in the column will be lost.
  - Added the required column `contactMail` to the `Contect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contect" DROP COLUMN "contect",
ADD COLUMN     "contactMail" TEXT NOT NULL;
