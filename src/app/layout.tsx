import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

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
        className={`${geistSans.variable} antialiased grid grid-cols-1 grid-rows-[20px_1fr_20px] min-h-full items-center justify-center`}
      >
        <header className="flex flex-row px-5 max-w-2xl w-full mx-auto">
          <Link href="/" aria-label="Home" className="block">
            <h1>Kezbot</h1>
          </Link>
        </header>
        <main className="flex flex-col px-5 max-w-2xl w-full mx-auto">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
