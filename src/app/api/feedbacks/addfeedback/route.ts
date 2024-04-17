import {AddNewFeedback} from "../../utilities/Services/FeedbackService";
import { NextResponse } from "next/server";
import {validateAndAuthorizeToken} from "@/app/api/utilities/helpers/tokenHelper"


interface Feedback {
    title: string,
    feedback: string,
    created_by: number | null,
}

export async function POST(req: Request) {
    if(!req.headers.get("authorization"))
        return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
    const token = req.headers.get("authorization")!.split(' ')[1];
    const isValid = validateAndAuthorizeToken(token, "any");
    if(isValid) {
        const feedback: Feedback = await req.json();
        if(typeof feedback.title !== 'string' || !feedback.title) {
            return NextResponse.json({ status: 400, statusText: "title is not defined or is not a string" }, {status: 400});
        }
        if(typeof feedback.feedback !== 'string' || !feedback.feedback) {
            return NextResponse.json({ status: 400, statusText: "feedback is not defined or is not a string" }, {status: 400});
        }
    
        const result = await AddNewFeedback(feedback);
        return NextResponse.json({Response: result}, {status: result.status});
    }else {
        return NextResponse.json({Response: {status: 401, statusText: "Unathorized", data: null}}, {status: 401});
    }
    
}