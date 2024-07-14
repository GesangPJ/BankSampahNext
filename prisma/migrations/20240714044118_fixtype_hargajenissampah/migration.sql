/*
  Warnings:

  - Changed the type of `hargajenissampah` on the `JenisSampah` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "JenisSampah" DROP COLUMN "hargajenissampah",
ADD COLUMN     "hargajenissampah" INTEGER NOT NULL;
