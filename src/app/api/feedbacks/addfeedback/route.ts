import {Tables} from "@/types/Dto";
import {AddNewFeedback} from "../../utilities/Services/FeedbackService";
import { NextResponse } from "next/server";


interface Feedback {
    title: string,
    feedback: string,
    created_by: number | null,
}

export async function POST(res: Response) {
    const feedback: Feedback = await res.json();
    if(typeof feedback.title !== 'string' || !feedback.title) {
        return NextResponse.json({ status: 400, statusText: "title is not defined or is not a string" }, {status: 400});
    }
    if(typeof feedback.feedback !== 'string' || !feedback.feedback) {
        return NextResponse.json({ status: 400, statusText: "feedback is not defined or is not a string" }, {status: 400});
    }
   
    const result = await AddNewFeedback(feedback);
    return NextResponse.json({Response: result}, {status: result.status});
}