-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT './default/default-profile.png',
ADD COLUMN     "bio" TEXT NOT NULL DEFAULT '';
