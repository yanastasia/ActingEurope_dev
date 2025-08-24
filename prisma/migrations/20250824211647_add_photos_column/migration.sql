-- AlterTable
ALTER TABLE "theatres" ADD COLUMN     "photos" TEXT[] DEFAULT ARRAY[]::TEXT[];
