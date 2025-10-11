CREATE TABLE "readList" (
	"id" serial PRIMARY KEY NOT NULL,
	"articleId" integer
);
--> statement-breakpoint
ALTER TABLE "readList" ADD CONSTRAINT "readList_articleId_articles_id_fk" FOREIGN KEY ("articleId") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;