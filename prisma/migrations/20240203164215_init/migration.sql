-- CreateTable
CREATE TABLE "Contect" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "contect" TEXT NOT NULL,

    CONSTRAINT "Contect_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contect" ADD CONSTRAINT "Contect_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
