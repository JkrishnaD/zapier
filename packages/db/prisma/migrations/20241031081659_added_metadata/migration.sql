-- AlterTable
ALTER TABLE "AvailableActions" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "AvailableTrigger" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';
