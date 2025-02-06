import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/header";
import { PreloadResources } from "@/components/preload-resources";

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
    <html lang="en" className="h-full">
      <PreloadResources />
      <body
        className={`${geistSans.variable} relative flex h-full min-h-full flex-col justify-center antialiased`}
      >
        <Header className="absolute inset-x-0 top-0 z-50" />
        <main className="flex h-full flex-grow flex-col pt-24">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
