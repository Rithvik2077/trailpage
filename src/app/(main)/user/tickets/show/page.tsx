"use client";

import React from "react";
// import Navbar from "@/components/UserNavbar";
import { useRouter } from "next/router";

function Show({ searchParams }: any) {
  const data = searchParams;
  console.log(data);

  async function updateStatusById(id) {
    console.log(id);
    const body_params = {
      ticket_id: id,
      status: 1,
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex gap-4">
        <div>#{data.id}</div>
        <div>{data.title}</div>
        <div
          className={`${
            data.status == "Open" ? "bg-red-500" : "bg-green-500 "
          }  rounded-full px-2 py-1 text-sm text-white`}
        >
          {data.status}
        </div>
      </div>
      <div>{data.description}</div>

      <button onClick={() => updateStatusById(data.id)}>Mark as closed</button>
    </div>
  );
}

export default Show;
