"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      maxSteps: 5,
    });

  return (
    <div className="relative h-full">
      <div className="container">
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              <div>
                <div className="font-bold">{m.role}</div>
                <p>{m.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-50 border-t bg-background/60 py-2.5 backdrop-blur-md">
        <div className="container flex flex-col gap-y-2.5">
          <form onSubmit={handleSubmit}>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <div className="relative">
              <Input
                className="pr-14"
                name="message"
                id="message"
                placeholder="Message Kezbot"
                value={input}
                onChange={handleInputChange}
                required
                spellCheck={false}
                disabled={isLoading}
              />
              <Button
                className="absolute right-1.5 top-1/2 h-11 w-11 -translate-y-1/2"
                type="submit"
                aria-label="Send"
                disabled={isLoading}
              >
                <Icon name="lucide/send" />
              </Button>
            </div>
          </form>
          <p className="text-center text-xs font-medium text-gray-500">
            Kezbot has been known to hallucinate from time to time.
          </p>
        </div>
      </div>
    </div>
  );
}
