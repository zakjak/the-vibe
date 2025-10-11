DROP INDEX "search_index";--> statement-breakpoint
CREATE INDEX "search_index" ON "articles" USING gin ((
          setweight(to_tsvector('english', "title"), 'A') ||
          setweight(to_tsvector('english', "story"), 'B') ||
          setweight(to_tsvector('english', "author"), 'C') ||
          setweight(to_tsvector('english', "category"), 'D') ||
      ));