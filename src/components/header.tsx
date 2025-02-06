import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

export default function Header({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn("border-b bg-background/60 backdrop-blur-md", className)}
    >
      <div className="container flex flex-row py-5">
        <Link href="/" aria-label="Home" className="block">
          <h1>Kezbot</h1>
        </Link>
      </div>
    </header>
  );
}
