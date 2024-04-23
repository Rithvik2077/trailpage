"use client";
import React, { useState } from "react";
import { url_mark_feedback_viewed } from "@/app/lib/apiEndPoints";

function Feedback({ feedback }) {
  const [viewed, setViewed] = useState(feedback.viewed);
  const { id, title, description, createdby, createdat } = feedback;

  
  return (
    <div className="mb-4 w-4/6 rounded-md bg-slate-100 p-4 shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-m rounded-lg bg-slate-200 px-2 py-1 text-black shadow-md">
          {createdby ? createdby : "Anonymous"}
        </p>
      </div>
      <p className="mb-2 text-base">{description}</p>
      <div className="flex flex-row items-center justify-between">
        <p className="text-sm text-gray-500">
          {new Date(createdat).toLocaleString()}
        </p>
        {(!viewed && (
          <p className="rounded-3xl bg-red-500 px-2 py-1 text-white">
            Not Viewed
          </p>
        )) || (
          <p className="rounded-3xl bg-green-500 px-2 py-1 text-white">
            Viewed
          </p>
        )}
      </div>
    </div>
  );
}

export default Feedback;
