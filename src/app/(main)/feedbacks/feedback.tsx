"use client";
import React, { useState } from "react";
import { url_mark_feedback_viewed } from "@/app/lib/apiEndPoints";

function Feedback({ feedback }) {
  const [viewed, setViewed] = useState(feedback.viewed);
  const [marking, setMarking] = useState(false);
  const { id, title, description, createdby, createdat } = feedback;

  async function markRead() {
    if (marking) return;
    try {
      setMarking(true);
      const url = url_mark_feedback_viewed + id;
      await fetch(url, {
        method: "PUT",
      })
        .then((res) => setViewed(true))
        .catch((err) => {
          setMarking(false);
          console.log(err);
        });
    } catch (err) {
      setMarking(false);
      console.log(err);
    }
  }
  return (
    <div className="mb-4 w-4/6 rounded-md bg-white p-4 shadow-md">
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
          <button
            disabled={marking}
            onClick={markRead}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            {marking ? "Marking..." : "Mark as Viewed"}
          </button>
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
