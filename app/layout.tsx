import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@faceit/components/StoreProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { WebVitals } from "./_components/web-vitals";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faceit",
  icons: {
    icon: [
      { url: "/efg-favicon-150x150.png", sizes: "150x150" },
      { url: "/efg-favicon-300x300.png", sizes: "300x300" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpeedInsights />
        <WebVitals />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
