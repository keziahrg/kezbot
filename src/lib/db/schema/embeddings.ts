import {
  AnyPgColumn,
  index,
  integer,
  pgTable,
  vector,
} from "drizzle-orm/pg-core";
import { facts } from "./facts";

export const embeddings = pgTable(
  "embeddings",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    factId: integer("fact_id").references((): AnyPgColumn => facts.id),
    vector: vector("vector", { dimensions: 1536 }).notNull(),
  },
  (table) => [
    index("vectorIndex").using("hnsw", table.vector.op("vector_cosine_ops")),
  ]
);
