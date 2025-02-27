"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { generateId, Message as MessageProps } from "ai";
import { useToast } from "@/hooks/use-toast";
import { useInView } from "@/hooks/use-in-view";
import { LoadingSpinner } from "@/components/loading-spinner";
import {
  Chat,
  ChatContent,
  ChatFooter,
  ChatMessage,
  ChatMessagesList,
  ChatScrollAnchor,
  ChatScrollToBottomButton,
} from "@/components/chat";
import { Paragraph } from "@/components/paragraph";
import { Label } from "@/components/ui/label";

const initialMessages = [
  {
    id: generateId(),
    role: "assistant",
    content:
      "Hey! I'm Kezbot, your go-to source for information about Keziah Rackley-Gale.",
    parts: [
      {
        type: "text",
        text: "Hey! I'm Kezbot, your go-to source for information about Keziah Rackley-Gale.",
      },
    ],
  },
] as MessageProps[];

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, status, setInput } =
    useChat({
      initialMessages,
      maxSteps: 5,
    });
  const { toast } = useToast();
  const { inView, inViewRef } = useInView();
  const speechRecognitionRef = useRef<SpeechRecognition>(null);
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] =
    useState<boolean>(true);
  const [isSpeechToTextActive, setIsSpeechToTextActive] =
    useState<boolean>(false);
  const [inputStatus, setInputStatus] = useState<
    "waitingOnInput" | "readyToSubmit"
  >("waitingOnInput");

  useLayoutEffect(() => {
    setIsSpeechRecognitionSupported(
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window
    );
  }, []);

  useEffect(() => {
    if (!isSpeechToTextActive && input && input.length > 0) {
      setInputStatus("readyToSubmit");
    } else {
      setInputStatus("waitingOnInput");
    }
  }, [isSpeechToTextActive, input]);

  useEffect(() => {
    if (status === "error") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }, [status, toast]);

  const handleOnScrollToBottomButtonClick = () => {
    inViewRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOnClick = () => {
    if (isSpeechToTextActive) {
      speechRecognitionRef?.current?.stop();
      setIsSpeechToTextActive(false);
      return;
    }

    try {
      const SpeechRecognition =
        window.SpeechRecognition ?? window.webkitSpeechRecognition;

      speechRecognitionRef.current = new SpeechRecognition();
      speechRecognitionRef.current.continuous = true;
      speechRecognitionRef.current.interimResults = false;

      speechRecognitionRef.current.onstart = function () {
        setIsSpeechToTextActive(true);
      };

      let finalTranscript = "";

      speechRecognitionRef.current.onresult = function (event) {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
            setInput(finalTranscript);
          }
        }
      };

      speechRecognitionRef.current.onerror = function (event) {
        speechRecognitionRef?.current?.abort();
        setIsSpeechToTextActive(false);

        if (event.error === "not-allowed") {
          console.warn("Microphone permission denied");
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              "Microphone permission was denied. Allow microphone access to continue.",
          });
        } else if (event.error === "service-not-allowed") {
          console.warn("Speech recognition not allowed by the browser");
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              "Speech recognition not allowed by the browser. Use a different browser to continue.",
          });
        } else {
          console.error("Speech recognition error:", event.error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Voice to text failed.",
          });
        }

        return;
      };

      speechRecognitionRef.current.start();
    } catch (error) {
      console.error("handleOnClick error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        description: "Voice to text failed. Please try a different browser.",
      });
    }
  };

  return (
    <Chat>
      <ChatContent>
        <ChatMessagesList className="pb-[118px] pt-24">
          {messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
          <ChatScrollAnchor ref={inViewRef}>
            {status === "streaming" && <LoadingSpinner />}
          </ChatScrollAnchor>
          <div className="container absolute bottom-[118px] z-50 flex justify-end px-10">
            <ChatScrollToBottomButton
              disabled={inView}
              aria-disabled={inView}
              className={cn("!opacity-0", !inView && "!opacity-1")}
              onClick={handleOnScrollToBottomButtonClick}
            />
          </div>
        </ChatMessagesList>
      </ChatContent>
      <ChatFooter>
        <div className="container relative flex flex-col gap-y-2.5">
          <form onSubmit={handleSubmit} className="relative">
            <Label htmlFor="message">Message</Label>
            <Input
              className="pr-14"
              name="message"
              id="message"
              placeholder="Message Kezbot"
              value={input}
              onChange={handleInputChange}
              required
              spellCheck={false}
              autoComplete="false"
              disabled={status !== "ready"}
            />
            {!isSpeechRecognitionSupported ||
            inputStatus === "readyToSubmit" ? (
              <Button
                className="absolute right-1.5 top-1/2 -translate-y-1/2"
                type="submit"
                size="icon"
              >
                <Icon name="lucide/send" />
                <span className="sr-only">Send message</span>
              </Button>
            ) : (
              <Button
                className="absolute right-1.5 top-1/2 -translate-y-1/2"
                type="button"
                size="icon"
                onClick={handleOnClick}
              >
                <Icon
                  name="lucide/mic"
                  className={cn(isSpeechToTextActive && "text-red")}
                />
                <span className="sr-only">
                  {`Record${isSpeechToTextActive && "ing"} `}message
                </span>
              </Button>
            )}
          </form>
          <Paragraph variant="disclaimer" alignment="center">
            Kezbot has been known to hallucinate.
          </Paragraph>
        </div>
      </ChatFooter>
    </Chat>
  );
}
