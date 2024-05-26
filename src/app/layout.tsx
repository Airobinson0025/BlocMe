import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/providers/session-provider";

const font = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlocMe",
  description: "A blockchain-based social media platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = null; // Replace 'null' with the actual session value
  return (
    <html lang="en">
      <body className={font.className}>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
