import { db } from ".";
import { facts } from "./schema/facts";

const content = [
  { content: "Keziah's name is pronounced kee-zee-ah" },
  { content: "Keziah is from Christchurch, New Zealand" },
  { content: "Keziah was born in New Zealand" },
  {
    content: "Keziah is a dual citizen of New Zealand and the United Kingdom",
  },
  { content: "Keziah lives in London, United Kingdom" },
  { content: "Keziah moved to London on 22nd April 2023" },
  { content: "Keziah was born on 16th September 1994" },
  { content: "Keziah is 30 years old" },
  { content: "Keziah has green eyes" },
  { content: "Keziah has brown hair" },
  { content: "Keziah has a partner named Ruby" },
  { content: "Keziah is a front-end engineer" },
  { content: "Keziah began working as a web developer in November 2019" },
  {
    content:
      "Keziah works with the following tech stack: React, React Native, TypeScript, Next.js, and Tailwind CSS",
  },
];

async function main() {
  try {
    console.log("Seed start");
    await db.insert(facts).values(content);
    console.log("Seed done");
  } catch (e) {
    console.error(e);
  }
}

main();
