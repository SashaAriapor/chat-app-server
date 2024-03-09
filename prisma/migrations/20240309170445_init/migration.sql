-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_from_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_from_fkey" FOREIGN KEY ("from") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
