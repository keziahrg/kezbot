import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KezBot",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} grid min-h-full grid-cols-1 grid-rows-[20px_1fr_20px] items-center justify-center antialiased`}
      >
        <Header />
        <main className="mx-auto flex w-full max-w-2xl flex-col px-5">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
