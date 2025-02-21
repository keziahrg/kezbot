"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useRef, RefAttributes } from "react";
import { Message as MessageProps } from "ai";
import { Button, ButtonProps } from "./ui/button";
import { Icon } from "./icon";

export const Chat = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("relative h-full", className)} {...props}>
      {children}
    </div>
  );
};

export const ChatContent = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  const scrollTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = () => {
      if (scrollTopRef.current) {
        scrollTopRef.current.scrollTo({
          // Scrolls up (since flex-col-reverse on our chatWindowRef element flips it)
          top: scrollTopRef.current.scrollHeight,
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
      className={cn(
        "flex h-full flex-col-reverse gap-y-4 overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const ChatMessagesList = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("container relative flex-grow space-y-3", className)}
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
  return (
    <div
      aria-label={`${role === "user" ? "You" : "Kezbot"} said:`}
      className={cn(
        "w-fit max-w-[70%] animate-slide-up whitespace-pre-wrap rounded-lg bg-foreground p-4 text-background",
        role === "user"
          ? "ml-auto mr-0 rounded-br-none bg-foreground text-right"
          : "ml-0 mr-auto rounded-bl-none",
        className
      )}
    >
      {parts && parts.length > 0
        ? parts.map((part, index) => {
            if (part.type === "text") {
              return <p key={index}>{part.text}</p>;
            }
          })
        : null}
    </div>
  );
};

export const ChatScrollAnchor = ({
  children,
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>) => {
  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {children}
    </div>
  );
};

export const ChatScrollToBottomButton = ({
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      className={cn(
        "absolute bottom-[120px] right-[1.25rem] z-50 rounded-full transition-all",
        className
      )}
      size="icon"
      {...props}
    >
      <Icon name="lucide/arrow-down" />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
};

export const ChatFooter = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
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
};
