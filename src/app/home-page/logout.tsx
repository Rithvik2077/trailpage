"use client";

import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  async function deletecookie() {
    // cookies().set('name', 'value', { maxAge: 0 })
    console.log("in func");
    document.cookie = `Authorize=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.setItem("Authorize", "");

    router.push("/");
  }

  return (
    <div>
      <button onClick={deletecookie}>Logout</button>
    </div>
  );
}
