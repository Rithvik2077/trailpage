"use client";

import React from "react";
import Link from "next/link";

function TicketGeneratorButton() {
  return (
    <Link
      href="/user/tickets/new"
      className="inline-block cursor-pointer rounded-md bg-red-600 p-2 text-white"
    >
      <div>+ Add Ticket</div>
    </Link>
  );
}

export default TicketGeneratorButton;
