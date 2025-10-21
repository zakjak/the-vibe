ALTER TABLE "comments" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "id" DROP IDENTITY;