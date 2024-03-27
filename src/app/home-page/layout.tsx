"use client";

import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>{children}</body>
      </SessionProvider>
    </html>
  );
}
