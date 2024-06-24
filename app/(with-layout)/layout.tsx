import { Footer } from "@faceit/components/Footer";
import { Header } from "@faceit/components/Header";
import { Metadata } from "next";
import React from "react";
import { metadata as RootMetadata } from "../layout";

export const metadata: Metadata = {
  ...RootMetadata,
  title: "Feed Preview",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
}
