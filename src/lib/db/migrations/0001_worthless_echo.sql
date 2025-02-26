CREATE TABLE "embeddings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "embeddings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"factId" integer,
	"vector" vector(1536)
);
--> statement-breakpoint
CREATE TABLE "facts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "facts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"content" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "embeddings" ADD CONSTRAINT "embeddings_factId_facts_id_fk" FOREIGN KEY ("factId") REFERENCES "public"."facts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "vectorIndex" ON "embeddings" USING hnsw ("vector" vector_cosine_ops);
