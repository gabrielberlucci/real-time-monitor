/*
  Warnings:

  - Added the required column `urlText` to the `Logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logs" ADD COLUMN     "urlText" TEXT NOT NULL;
