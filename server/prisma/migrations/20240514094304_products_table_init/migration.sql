/*
  Warnings:

  - Added the required column `email` to the `userAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `userAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `useraccount` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
