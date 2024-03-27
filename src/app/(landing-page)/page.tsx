"use client";
import AboutSectionOne from "@/app/(landing-page)/_components/AboutSectionOne";

import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/app/(landing-page)/_components/hero";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <AboutSectionOne />
    </>
  );
}
