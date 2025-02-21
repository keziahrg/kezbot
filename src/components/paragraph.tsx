import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const paragraphVariants = cva(
  "text-xs font-medium text-gray-500 dark:text-gray-400",
  {
    variants: {
      variant: {
        default: "",
        disclaimer: "text-xs font-medium text-gray-500 dark:text-gray-400",
      },
      alignment: {
        default: "text-left",
        center: "text-center",
      },
    },
    defaultVariants: {
      variant: "default",
      alignment: "center",
    },
  }
);

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  asChild?: boolean;
}

export const Paragraph = ({
  children,
  className,
  variant,
  ...props
}: ParagraphProps) => {
  return (
    <p className={cn(paragraphVariants({ variant, className }))} {...props}>
      {children}
    </p>
  );
};
