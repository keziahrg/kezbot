"use client";

import { cn } from "@/lib/utils";
import {
  HTMLAttributes,
  useEffect,
  useRef,
  RefAttributes,
  Fragment,
} from "react";
import { Message as MessageProps } from "ai";
import { Button, ButtonProps } from "./ui/button";
import { Icon } from "./icon";

export const Chat = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("relative h-full", className)} {...props}>
    {children}
  </div>
);

export const ChatContent = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex h-full flex-col-reverse gap-y-4 overflow-y-hidden",
      className
    )}
  >
    {children}
  </div>
);

export const ChatMessagesList = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const scrollTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = () => {
      console.log("hello");
      if (scrollTopRef.current) {
        scrollTopRef.current.scrollTo({
          // Scrolls up (since flex-col-reverse on our chatWindowRef element flips it)
          top: -scrollTopRef.current.scrollHeight,
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
    <div
      ref={scrollTopRef}
      className={cn("container flex-grow space-y-3 overflow-y-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const ChatMessage = ({
  role,
  parts,
  className,
}: MessageProps & HTMLAttributes<HTMLDivElement>) => {
  if (!parts || parts.length === 0) return null;

  return (
    <>
      {parts.map((part, index) => {
        return (
          <Fragment key={index}>
            {part.type === "text" ? (
              <div
                aria-label={`${role === "user" ? "You" : "Kezbot"} said:`}
                className={cn(
                  "flex w-fit max-w-[70%] animate-slide-up whitespace-pre-wrap rounded-lg bg-foreground p-4 text-background",
                  role === "user"
                    ? "ml-auto mr-0 rounded-br-none bg-foreground text-right"
                    : "ml-0 mr-auto rounded-bl-none",
                  className
                )}
              >
                <p>{part.text}</p>
              </div>
            ) : part.type === "tool-invocation" ? (
              <div aria-label="Kezbot said:" className="animate-slide-up">
                <p>
                  <em>Kezbot is thinking...</em>
                </p>
              </div>
            ) : null}
          </Fragment>
        );
      })}
    </>
  );
};

export const ChatScrollAnchor = ({
  children,
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>) => (
  <div ref={ref} className={cn("w-full", className)} {...props}>
    {children}
  </div>
);

export const ChatScrollToBottomButton = ({
  className,
  ...props
}: ButtonProps) => (
  <Button
    className={cn("rounded-full transition-all", className)}
    size="icon"
    {...props}
  >
    <Icon name="lucide/arrow-down" />
    <span className="sr-only">Scroll to bottom</span>
  </Button>
);

export const ChatFooter = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "absolute inset-x-0 bottom-0 z-50 bg-background/75 py-2.5 backdrop-blur-md",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
