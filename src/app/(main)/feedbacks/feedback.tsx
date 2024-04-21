"use client"
import { METHODS } from "http";
import React, {useState} from "react";
import Loading from "./loading";

function Feedback({feedback}) {
    const [viewed, setViewed] = useState(feedback.viewed)
    const [marking, setMarking] = useState(false);
    const {id, title, description, createdby, createdat} = feedback;

    async function markRead() {
        if(marking) return
        try {
            setMarking(true)
            const url = "/api/feedbacks/admin/markviewed?id="+id;
            await fetch(url, {
                method: "PUT"
            })
            .then(res => setViewed(true))
            .catch(err => {
                setMarking(false)
                console.log(err)
            });
        }catch(err) 
        {
            setMarking(false)
            console.log(err);
        }
    }
   return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 w-4/6">
    <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-m text-black bg-slate-200 px-2 py-1 rounded-lg shadow-md">{createdby?createdby:"Anonymous"}</p>
    </div>
        <p className="text-base mb-2">{description}</p>
        <div className="flex flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
                {new Date(createdat).toLocaleString()}
            </p>
            {!viewed &&
                <button 
                disabled={marking}
                onClick={markRead}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    {marking?"Marking...":"Mark as Viewed"}
                </button>
            || 
                <p className="bg-green-500 text-white px-2 py-1 rounded-3xl">Viewed</p>
            }
        </div>
</div>

   )
}

export default Feedback;