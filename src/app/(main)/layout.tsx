"use client";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <html lang="en">
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "../providers";
import Navbar from "@/components/repo2/Navbar";
import { useState } from "react";
