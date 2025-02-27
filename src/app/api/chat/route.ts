import { streamText, tool } from "ai";
import { z } from "zod";
import { getIp, ratelimiter } from "@/lib/utils";
import { openai } from "@/lib/ai/openai";
import { findRelevantContent } from "@/lib/ai/embedding";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

const toolInvocation = z
  .object({
    state: z.string(),
    step: z.number(),
    toolCallId: z.string(),
    toolName: z.string(),
    args: z.object({
      question: z.string().optional(),
    }),
    result: z.array(z.object({ content: z.string() })),
  })
  .partial();

const text = z.object({ type: z.string(), text: z.string() }).partial();

const payload = z.object({
  messages: z
    .array(
      z.object({
        role: z.string(),
        content: z.string(),
        toolInvocations: z.array(toolInvocation).optional(),
        parts: z.array(z.union([text, toolInvocation])).nonempty(),
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
      system: `You are a helpful assistant. Check your knowledge base before answering any questions.
      Only respond to questions using information from tool calls.
      If no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,
      messages: messages,
      tools: {
        getInformation: tool({
          description:
            "Get information from your knowledge base to answer questions.",
          parameters: z.object({
            question: z.string().describe("The users question."),
          }),
          execute: async ({ question }) => findRelevantContent(question),
        }),
      },
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
