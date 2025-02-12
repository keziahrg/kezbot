"use client";

import { useTheme } from "next-themes";
import { Icon } from "./icon";
import { HTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  const [mounted, setMounted] = useState<boolean>(false);

  const { resolvedTheme, setTheme } = useTheme();
  const oppositeTheme = resolvedTheme === "dark" ? "light" : "dark";

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleOnClick = () => {
    setTheme(oppositeTheme);
  };

  return (
    <button
      aria-label={`Change theme from ${resolvedTheme} to ${oppositeTheme}`}
      onClick={handleOnClick}
      className={cn("flex place-items-center text-xl", className)}
      {...props}
    >
      {resolvedTheme === "dark" ? (
        <Icon name="lucide/moon" />
      ) : (
        <Icon name="lucide/sun" />
      )}
    </button>
  );
};
