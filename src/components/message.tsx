import { cn } from "@/lib/utils";
import { Message as MessageProps } from "ai";

export const Message = ({ role, parts }: MessageProps) => {
  return (
    <div
      aria-label={`${role === "user" ? "You" : "Kezbot"} said:`}
      className={cn(
        "animate-slide-up w-fit max-w-[70%] whitespace-pre-wrap rounded-lg bg-foreground p-4 text-background",
        role === "user"
          ? "ml-auto mr-0 rounded-br-none bg-foreground text-right"
          : "ml-0 mr-auto rounded-bl-none"
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
