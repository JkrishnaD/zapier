-- DropIndex
DROP INDEX "ZapRun_zapId_key";

-- AlterTable
ALTER TABLE "ZapRun" ALTER COLUMN "metadata" DROP DEFAULT;
