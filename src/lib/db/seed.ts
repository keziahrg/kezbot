import { sql } from "drizzle-orm";
import { db } from ".";
import { generateEmbedding } from "../ai/embedding";
import { embeddings } from "./schema/embeddings";
import { facts } from "./schema/facts";

const initialFacts = [
  "Keziah's name is pronounced kee-zee-ah",
  "Keziah is from Christchurch, New Zealand",
  "Keziah was born in New Zealand",
  "Keziah is a dual citizen of New Zealand and the United Kingdom",
  "Keziah lives in London, United Kingdom",
  "Keziah moved to London on 22nd April 2023",
  "Keziah was born on 16th September 1994",
  "Keziah is 30 years old",
  "Keziah has green eyes",
  "Keziah has brown hair",
  "Keziah has a partner named Ruby",
  "Keziah is a frontend-focused full stack developer",
  "Keziah began working as a web developer in November 2019",
  "Keziah works with the following tech stack: React, React Native, TypeScript, Next.js, and Tailwind CSS",
];

async function resetDatabase() {
  console.log("Start resetting database");
  await db.execute(
    sql`TRUNCATE TABLE facts, embeddings RESTART IDENTITY CASCADE;`
  );
  console.log("Resetting database done");
}

async function main() {
  try {
    console.log("Seed start");
    await resetDatabase();
    initialFacts.forEach(async (initialFact) => {
      const [fact] = await db
        .insert(facts)
        .values([{ content: initialFact }])
        .returning();
      const embedding = await generateEmbedding(fact.content);
      await db.insert(embeddings).values([{ ...embedding, factId: fact.id }]);
    });
    console.log("Seed done");
  } catch (e) {
    console.error(e);
  }
}

main();
