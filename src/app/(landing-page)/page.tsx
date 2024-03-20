import AboutSectionOne from "@/app/(landing-page)/_components/AboutSectionOne";

import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/app/(landing-page)/_components/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <AboutSectionOne />
    </>
  );
}
