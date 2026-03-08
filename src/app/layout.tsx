import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RedClaw — A million red claws",
  description:
    "OpenClaw setup for the most cracked teams on earth. Custom-built agent stacks for YC startups, enterprises, and the builders who refuse to move slow.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon-180.png",
  },
  openGraph: {
    title: "RedClaw — A million red claws",
    description: "OpenClaw setup for the most cracked teams on earth.",
    url: "https://redclaw.co",
    siteName: "RedClaw",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RedClaw — A million red claws",
    description: "OpenClaw setup for the most cracked teams on earth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${inter.variable} antialiased bg-[#080808] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
