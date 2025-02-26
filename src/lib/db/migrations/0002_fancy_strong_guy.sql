ALTER TABLE "embeddings" RENAME COLUMN "factId" TO "fact_id";--> statement-breakpoint
ALTER TABLE "embeddings" DROP CONSTRAINT "embeddings_factId_facts_id_fk";
--> statement-breakpoint
ALTER TABLE "embeddings" ADD CONSTRAINT "embeddings_fact_id_facts_id_fk" FOREIGN KEY ("fact_id") REFERENCES "public"."facts"("id") ON DELETE no action ON UPDATE no action;