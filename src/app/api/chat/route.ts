import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { getIp, ratelimiter } from "@/lib/utils";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

const openai = createOpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const payload = z.object({
  messages: z
    .array(
      z.object({
        role: z.string(),
        content: z.string(),
        parts: z
          .array(z.object({ type: z.string(), text: z.string() }))
          .optional(),
      })
    )
    .min(2),
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const ip = await getIp(req.headers);
    const ratelimit = await ratelimiter.limit(`ratelimit_${ip}`);

    if (!ratelimit.success) {
      return new Response(null, {
        status: 409,
        statusText: "Ratelimit reached",
      });
    }

    if (req.method !== "POST") {
      return new Response(null, {
        status: 405,
        statusText: "Method not allowed",
      });
    }

    if (req.headers.get("Content-Type") !== "application/json") {
      return new Response(null, {
        status: 406,
        statusText: "Invalid content-type header",
      });
    }

    if (!payload.safeParse({ messages }).success) {
      return new Response(null, {
        status: 400,
        statusText: "Invalid payload",
      });
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: "You are a helpful assistant.",
      messages: messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("🚨", error);

    return new Response(null, {
      status: 500,
      statusText: "Server error",
    });
  }
}
