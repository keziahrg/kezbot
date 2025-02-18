import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export const ratelimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export async function getIp(headers: Request["headers"]) {
  const forwardedFor = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) return realIp.trim();

  return "0.0.0.0";
}
