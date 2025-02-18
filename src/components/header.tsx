import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { ThemeToggle } from "./theme-toggle";

export default function Header({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <header className={cn("bg-background/75 backdrop-blur-md", className)}>
      <div className="container flex flex-row items-center justify-between py-2.5">
        <h1 className="font-medium">Kezbot</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
