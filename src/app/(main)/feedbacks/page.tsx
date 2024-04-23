"use client";
import React, { useState, useEffect } from "react";
import Feedback from "@/components/Common/feedbackCard";
import Loading from "@/components/Common/LoadingScreen";
import { url_get_feedbacks } from "@/app/lib/apiEndPoints";

function Feedbacks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetFeedbacks();
  }, []);

  async function GetFeedbacks() {
    // const url = "/api/feedbacks/admin/getfeedbacks";
    try {
      await fetch(url_get_feedbacks, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.Response.result);
          // console.log(data.Response.result)
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-slate-300">
      {loading ? (
        <Loading size={75} />
      ) : (
        <div className="h-100 flex  flex-col items-center px-4 py-2">
          {data.map((feedback, idx) => (
            <Feedback key={idx} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Feedbacks;
