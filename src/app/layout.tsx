import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

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
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
