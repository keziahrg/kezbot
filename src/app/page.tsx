"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(true);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      maxSteps: 5,
    });

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
    const theRef = scrollAnchorRef.current;
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "0px 0px -120px 0px",
      threshold: 1.0,
    });

    if (theRef) observer.observe(theRef);

    return () => {
      if (theRef) observer.unobserve(theRef);
    };
  }, [scrollAnchorRef]);

  return (
    <div className="relative h-full overflow-y-hidden pb-[104px] pt-[65px]">
      <div className="h-full space-y-4 overflow-y-auto pb-4 pt-8">
        <div className="container">
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              <div>
                <div className="font-bold">{m.role}</div>
                <p>{m.content}</p>
              </div>
            </div>
          ))}
          <div ref={scrollAnchorRef} className="h-1 w-full" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-50 border-t bg-background/60 py-2.5 backdrop-blur-md">
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
              />
              <Button
                className="absolute right-1.5 top-1/2 -translate-y-1/2"
                type="submit"
                disabled={isLoading}
                aria-disabled={isLoading}
                size="icon"
              >
                <Icon name="lucide/send" />
                <span className="sr-only">Send message</span>
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
