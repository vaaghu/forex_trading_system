/*
  Warnings:

  - You are about to drop the column `userId` on the `user_currency_balances` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,symbol]` on the table `user_currency_balances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `user_currency_balances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_currency_balances" DROP CONSTRAINT "user_currency_balances_userId_fkey";

-- AlterTable
ALTER TABLE "user_currency_balances" DROP COLUMN "userId",
ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_currency_balances_user_id_symbol_key" ON "user_currency_balances"("user_id", "symbol");

-- AddForeignKey
ALTER TABLE "user_currency_balances" ADD CONSTRAINT "user_currency_balances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
