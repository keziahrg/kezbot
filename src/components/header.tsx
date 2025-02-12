import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { ThemeToggle } from "./theme-toggle";

export default function Header({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn("border-b bg-background/60 backdrop-blur-md", className)}
    >
      <div className="container flex flex-row items-center justify-between py-4">
        <Link href="/" aria-label="Home" className="block py-1">
          <h1 className="font-medium">Kezbot</h1>
        </Link>
        <ThemeToggle className="py-1" />
      </div>
    </header>
  );
}
