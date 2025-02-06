import { type SVGProps } from "react";
import { type IconName } from "@/types/name";
import { cn } from "@/lib/utils";

export const Icon = ({
  name,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) => (
  <svg
    {...props}
    className={cn("inline h-[1em] w-[1em] self-center", className)}
  >
    <use href={`/icons/sprite.svg#${name}`} />
  </svg>
);

export { IconName };
