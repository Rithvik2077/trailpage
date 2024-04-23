"use client";
import React, { use, useState } from "react";
import FeedbackForm from "./feedbackform"
import MyFeedback  from "./myFeedbacks";


function Feedbacks() {
  const[newFeedback, setNewFeedback] = useState(false);
  const [myFeedbacks, setMyFeedbacks] = useState(true);
  const normalButtonStyle = "bg-blue-100 py-4 w-full hover:bg-blue-200";
  const activeButtonStyle = "bg-blue-300 py-4 w-full";

  const switchButtonClasses = () => {
    setNewFeedback(!newFeedback);
    setMyFeedbacks(!myFeedbacks);
  }

  const handleNewFeedback = () => {
    switchButtonClasses();
  }

  const handleMyFeedbacks = () => {
    switchButtonClasses();
  }
  return (
    <div className="flex">
      <div className="h-full basis-2/12 flex flex-col gap-8 items-center py-10 px-0">
        <button 
        onClick={handleMyFeedbacks}
        className={myFeedbacks?activeButtonStyle:normalButtonStyle}
        >
          My Feedbacks
        </button>
        <button 
        onClick={handleNewFeedback}
        className={newFeedback?activeButtonStyle:normalButtonStyle}
        >
          New Feedback
        </button>
      </div>
      <div className="basis-10/12 flex items-center justify-center py-6">
        {newFeedback && <FeedbackForm/>}
        {myFeedbacks && <MyFeedback/>}
      </div>
    </div>
  );
}

export default Feedbacks;
