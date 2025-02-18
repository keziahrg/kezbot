"use client";

import { Icon } from "@/components/icon";
import { Message } from "@/components/message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { generateId, Message as MessageProps } from "ai";
import { useToast } from "@/hooks/use-toast";

const initialMessages = [
  {
    id: generateId(),
    role: "assistant",
    content:
      "Hey! I'm Kezbot, your go-to source for information about Keziah Rackley-Gale.",
    parts: [
      {
        type: "text",
        text: "Hey! I'm Kezbot, your go-to source for information about Keziah Rackley-Gale.",
      },
    ],
  },
] as MessageProps[];

export default function Home() {
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(true);
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    initialMessages,
    maxSteps: 5,
  });
  const { toast } = useToast();

  const handleOnScrollButtonClick = () => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setInView(entry.isIntersecting);
  };

  useEffect(() => {
    const scrollAnnchor = scrollAnchorRef.current;
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "0px 0px -120px 0px",
      threshold: 1.0,
    });

    if (scrollAnnchor) observer.observe(scrollAnnchor);

    return () => {
      if (scrollAnnchor) observer.unobserve(scrollAnnchor);
    };
  }, [scrollAnchorRef]);

  useEffect(() => {
    if (status === "error") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }, [status, toast]);

  useEffect(() => {
    const listener = () => {
      if (chatWindowRef.current) {
        chatWindowRef.current.scrollTo({
          // Scrolls up (since flex-col-reverse on our chatWindowRef element flips it)
          top: -chatWindowRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    document.addEventListener("scrollToTop", listener);

    return () => {
      document.removeEventListener("scrollToTop", listener);
    };
  }, []);

  return (
    <div className="relative h-full">
      <div
        ref={chatWindowRef}
        className="flex h-full flex-col-reverse gap-y-4 overflow-y-auto"
      >
        <div className="container flex-grow space-y-3 pb-[120px] pt-24">
          {messages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
          <div ref={scrollAnchorRef} className="w-full">
            {status === "streaming" && (
              <Icon name="lucide/loader-circle" className="animate-spin" />
            )}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-50 bg-background/75 py-2.5 backdrop-blur-md">
        <div className="container relative flex flex-col gap-y-2.5">
          <Button
            disabled={inView}
            aria-disabled={inView}
            onClick={handleOnScrollButtonClick}
            className={cn(
              "absolute -top-full right-5 z-50 -translate-y-1/4 rounded-full !opacity-0 transition-all",
              !inView && "!opacity-1 -translate-y-1/2"
            )}
            size="icon"
          >
            <Icon name="lucide/arrow-down" />
            <span className="sr-only">Scroll to bottom</span>
          </Button>
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
                disabled={status !== "ready"}
              />
              <Button
                className="absolute right-1.5 top-1/2 -translate-y-1/2"
                type="submit"
                size="icon"
              >
                <Icon name="lucide/send" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
          <p className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
            Kezbot has been known to hallucinate from time to time.
          </p>
        </div>
      </div>
    </div>
  );
}
