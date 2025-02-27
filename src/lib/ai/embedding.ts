import { embed } from "ai";
import { openai } from "./openai";

const embeddingModel = openai.embedding("text-embedding-ada-002");

export const generateEmbedding = async (
  value: string
): Promise<{ content: string; vector: Array<number> }> => {
  const embedding = await embed({
    model: embeddingModel,
    value,
  });

  return { content: embedding.value, vector: embedding.embedding };
};
