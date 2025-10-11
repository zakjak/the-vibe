ALTER TABLE "readList" RENAME TO "readlist";--> statement-breakpoint
ALTER TABLE "readlist" DROP CONSTRAINT "readList_articleId_articles_id_fk";
--> statement-breakpoint
ALTER TABLE "readlist" ADD CONSTRAINT "readlist_articleId_articles_id_fk" FOREIGN KEY ("articleId") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;