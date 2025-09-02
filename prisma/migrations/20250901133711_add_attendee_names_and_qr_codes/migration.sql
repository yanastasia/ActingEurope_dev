-- AlterTable
ALTER TABLE "public"."bookings" ADD COLUMN     "attendee_names" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "qr_code_data" TEXT[] DEFAULT ARRAY[]::TEXT[];
