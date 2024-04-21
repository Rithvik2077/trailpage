"use client"
import React, {use, useState} from "react";

function Feedbacks() {
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [conformation, setConformation] = useState(false);
  const [ack, setAck] = useState("");
  const [ackClass, setAckClass] = useState("text-red-700 font-semibold pt-1");
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    console.log("run")
    if(title.trim() === "") {
      setAck("Title is empty");
      setConformation(false);
      return
    }
    if(feedback.trim() === "") {
      setAck("Feedback is empty");
      setConformation(false);
      return
    }
    if(!conformation && !isAnonymous) {
      setShowDialog(true);
      return
    }
    const feedbackDTO = {
      title: title,
      feedback: feedback,
      anonymous: isAnonymous
    }
    setSending(true);
    const url = "/api/feedbacks/addfeedback";
    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(feedbackDTO),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(result => {
        console.log(result)
        setAck("Feedback submitted successfully");
        setAckClass("text-green-700 font-semibold pt-1")
        setTitle("")
        setFeedback("");
        setIsAnonymous(false);
        setConformation(false);
        setSending(false);
      })
      .catch(err => {
        console.log(err);
        setAck("Error while submitting feedback");
        setConformation(false);
        setAck("");
        setSending(false);
      })
    }
    catch(error) {
        setAck("Error while submitting feedback");
        setConformation(false);
        setAck("");
        setSending(false);
    }
  }

  return (
    <section>
      {showDialog && !isAnonymous && !conformation && (
        <div className="flex flex-col justify-center items-center bg-slate-500 bg-opacity-70 absolute left-0 right-0 top-0 bottom-0">
        <div className="w-fit px-6 py-4 flex flex-col p-2 justify-center items-center max-w-sm bg-white">
            <p className="px-2 py-4 text-lg font-bold text-center">
                  Your feedback will not be anonymous. Are you sure you want to proceed?
            </p>
           <div className="flex flex-row gap-2">
              <button onClick={() => {
                  setShowDialog(false)
                  setConformation(true)
                }} 
                className="bg-red-600 text-white px-4 py-2 max-w-48">
                    yes, proceed
                </button>
                <button 
                onClick={() => {
                  setShowDialog(false)
                  setIsAnonymous(true)
                  setConformation(true)
                }} 
                className="bg-green-600 text-white px-4 py-2 max-w-40">
                  Mark as Anonymous
                </button>
           </div>
        </div>
    </div>
      )}
      <div className="container">
        <div className="flex w-full items-center py-12 flex-col">
          <h2 className="mb-3 text-3xl font-bold text-black">
            Feedback Form
          </h2>
          <p className="text-sm">We value your feedback!</p>
          <form className="mt-5 text-start">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value)
                    setConformation(false)
                    setAck("")
                  }}
                  placeholder="Enter the title"
                  className="w-full rounded-md border-2 p-2"
                  required
                />
                <textarea
                  name="feedback"
                  id="feedback"
                  value={feedback}
                  onChange={e => {
                    setFeedback(e.target.value)
                    setConformation(false)
                    setAck("")
                  }}
                  cols={30}
                  rows={10}
                  className="mt-4 w-full rounded-md border-2 p-2"
                  placeholder="Feedback"
                  required
                ></textarea>
          </form>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={() => {
                  setIsAnonymous(!isAnonymous)
                  setConformation(false)
                  setAck("")
                }}
                className="mr-2 size-4"
              />
              <label htmlFor="anonymous" className="text-lg">Anonymous</label>
            </div>
            <p className={ackClass}>{ack}</p>
          <button 
            onClick={handleSubmit}
            className="mt-2 bg-rose-600 px-4 py-2 text-white">
            {sending?"Submitting":"Submit"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Feedbacks;

