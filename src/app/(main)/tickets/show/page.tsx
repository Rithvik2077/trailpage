"use client";

import React from "react";
// import Navbar from "@/components/UserNavbar";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

function Show({ searchParams }: any) {
  const { push } = useRouter();
  const data = searchParams;
  console.log(data);

  async function updateStatusById(id) {
    console.log(id);
    const body_params = {
      ticket_id: id,
      status: 4,
    };
    try {
      const response = await fetch("/api/tickets/updatestatus", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(body_params),
      });

      const res = await response.json();
      console.log("update", res);

      push("../tickets");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <div>#{data.id}</div>
        <div className="text-2xl">{data.title}</div>
        <div
          className={`${
            data.status == "Open" ? "bg-red-500" : "bg-green-500 "
          }  rounded-full px-2 py-1 text-sm text-white`}
        >
          {data.status}
        </div>
      </div>
      <div className="text-xl">{data.description}</div>

      <button
        className="rounded-md bg-black px-4 py-2 text-white"
        onClick={() => updateStatusById(data.id)}
      >
        Mark as closed
      </button>
    </div>
  );
}

export default Show;
