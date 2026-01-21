import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundParticles from "@/components/BackgroundParticles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karan Singh Chauhan | Tech Lead - Fullstack Blockchain",
  description:
    "Portfolio of Karan Singh Chauhan, Tech Lead specializing in Fullstack Blockchain development, DeFi protocols, NFT platforms, and Web3 applications. Expert in Solidity, Node.js, and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-500`}
      >
        <BackgroundParticles />
        <div className="min-h-screen relative z-10">{children}</div>
      </body>
    </html>
  );
}
