import { embed } from "ai";
import { openai } from "./openai";
import { cosineDistance, desc, gt, inArray, sql } from "drizzle-orm";
import { embeddings } from "../db/schema/embeddings";
import { db } from "../db";
import { facts } from "../db/schema/facts";

const embeddingModel = openai.embedding("text-embedding-ada-002");

export const generateEmbedding = async (
  value: string
): Promise<{ content: string; vector: Array<number> }> => {
  const input = value.trim().replaceAll("\\n", " ");
  const embedding = await embed({
    model: embeddingModel,
    value: input,
  });

  return { content: embedding.value, vector: embedding.embedding };
};

export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.vector,
    userQueryEmbedded.vector
  )})`;
  const similarEmbeddings = await db
    .select({
      factId: embeddings.factId,
      similarity,
    })
    .from(embeddings)
    .where(gt(similarity, 0.5))
    .orderBy(desc(similarity))
    .limit(4);

  const factIds = similarEmbeddings.map((entry) => entry.factId);

  if (factIds.length === 0) return [];

  const similarFacts = await db
    .select({ content: facts.content })
    .from(facts)
    .where(inArray(facts.id, factIds));

  return similarFacts;
};
