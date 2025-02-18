"use client";

import { useTheme } from "next-themes";
import { Icon } from "./icon";
import { HTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const ThemeToggle = ({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const oppositeTheme = resolvedTheme === "dark" ? "light" : "dark";

  const handleOnClick = () => {
    setTheme(oppositeTheme);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label={`Change theme from ${resolvedTheme} to ${oppositeTheme}`}
      onClick={handleOnClick}
      className={cn("rounded-full text-xl", className)}
      {...props}
    >
      {resolvedTheme === "dark" ? (
        <Icon name="lucide/moon" />
      ) : (
        <Icon name="lucide/sun" />
      )}
    </Button>
  );
};
