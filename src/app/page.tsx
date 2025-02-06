"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
  });

  return (
    <div className="relative h-full">
      <div className="container pb-24">
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
      <div className="absolute inset-x-0 bottom-0 z-50 border-t bg-background/60 backdrop-blur-md">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-stretch"
        >
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <Input
            name="message"
            id="message"
            placeholder="Message Kezbot"
            value={input}
            onChange={handleInputChange}
            required
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}
