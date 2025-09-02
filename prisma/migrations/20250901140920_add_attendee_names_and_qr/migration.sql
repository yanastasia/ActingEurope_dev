/*
  Warnings:

  - You are about to drop the column `qr_code_data` on the `bookings` table. All the data in the column will be lost.
  - The `attendee_names` column on the `bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "booked_seats" ADD COLUMN     "attendee_name" TEXT,
ADD COLUMN     "qr_code_data" TEXT,
ADD COLUMN     "scanned_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "qr_code_data",
DROP COLUMN "attendee_names",
ADD COLUMN     "attendee_names" JSONB;

-- CreateIndex
CREATE INDEX "booked_seats_booking_id_idx" ON "booked_seats"("booking_id");

-- CreateIndex
CREATE INDEX "booked_seats_seat_id_idx" ON "booked_seats"("seat_id");
