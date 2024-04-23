import React, {useEffect, useState} from "react"
import { url_user_feedbacks } from "@/app/lib/apiEndPoints"
import Feedback from "@/components/Common/userFeedbackCard";
import Loading from "@/components/Common/LoadingScreen";

export default function MyFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getFeedbacks();
    }, [])
    const getFeedbacks = async () => {
        setLoading(true);
        if(sessionStorage.getItem("feedbacks")) {
            setFeedbacks(JSON.parse(sessionStorage.getItem("feedbacks")))
            setLoading(false);
            return;
        }
        await fetch(url_user_feedbacks)
        .then(res => res.json())
        .then(data => {
            setFeedbacks(data.Response.result);
            // console.log(feedbacks);
            sessionStorage.setItem("feedbacks", JSON.stringify(data.Response.result));
            setLoading(false);
        })
        .catch(error => console.log(error))
    }
    return (
        <>
            {loading?<Loading size={75}/> :
                <div className="flex flex-col justify-center items-center">
                    {feedbacks.map((feedback, idx) => <Feedback key={idx} feedback={feedback}/> )}
                </div>
            }
        </>
    )
}