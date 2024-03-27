"use client";
import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
// import { getServerSession } from "next-auth";

export default function Logout() {
  return (
    <div>
      <span onClick={() => signOut()}>Logout</span>
    </div>
  );
}
