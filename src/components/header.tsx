"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { ThemeToggle } from "./theme-toggle";

export default function Header({ className }: HTMLAttributes<HTMLDivElement>) {
  const handleScrollToTop = () => {
    const event = new CustomEvent("scrollToTop");
    document.dispatchEvent(event);
  };

  return (
    <header className={cn("bg-background/75 backdrop-blur-md", className)}>
      <div className="container flex flex-row items-center justify-between py-2.5">
        <button
          aria-label="Scroll the chat window to the top"
          onClick={handleScrollToTop}
        >
          <h1 className="font-medium">Kezbot</h1>
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
