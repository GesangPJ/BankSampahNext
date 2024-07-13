/*
  Warnings:

  - You are about to drop the column `idjenissampah` on the `HistoryJenis` table. All the data in the column will be lost.
  - Added the required column `namajenissampah` to the `HistoryJenis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HistoryJenis" DROP CONSTRAINT "HistoryJenis_idjenissampah_fkey";

-- AlterTable
ALTER TABLE "HistoryJenis" DROP COLUMN "idjenissampah",
ADD COLUMN     "namajenissampah" TEXT NOT NULL;
