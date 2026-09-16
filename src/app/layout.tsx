import type { Viewport } from "next";
import { Prompt } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  display: "swap",
  variable: "--font-prompt",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f3f6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased ${prompt.variable}`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
