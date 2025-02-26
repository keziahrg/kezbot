import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const facts = pgTable("facts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  content: text("content").notNull(),
});
