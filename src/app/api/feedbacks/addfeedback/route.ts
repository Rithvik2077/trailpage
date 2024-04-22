import {AddNewFeedback} from "../../utilities/Services/FeedbackService";
import { NextResponse } from "next/server";
import {validateAndAuthorizeToken, GetPayloadDetails} from "@/app/api/utilities/helpers/tokenHelper"
import { cookies } from "next/headers";


interface Feedback {
    title: string,
    feedback: string,
    anonymous: boolean,
}

export async function POST(req: Request) {
    const auth = cookies().get('Authorize')
    const token = auth.value;
    const res = validateAndAuthorizeToken(token, "any");
    if(res) {
        const feedbackDTO: Feedback = await req.json();
        if(typeof feedbackDTO.title !== 'string' || !feedbackDTO.title) {
            return NextResponse.json({ status: 400, statusText: "title is not defined or is not a string" }, {status: 400});
        }
        if(typeof feedbackDTO.feedback !== 'string' || !feedbackDTO.feedback) {
            return NextResponse.json({ status: 400, statusText: "feedback is not defined or is not a string" }, {status: 400});
        }

        const feedback = {
            title: feedbackDTO.title, 
            feedback: feedbackDTO.feedback, 
            created_by: null,
        }

        if(!feedbackDTO.anonymous) {
            feedback.created_by = GetPayloadDetails(token, "id");
        }
    
        const result = await AddNewFeedback(feedback);
        return NextResponse.json({Response: result}, {status: result.status});
    }else {
        return NextResponse.json({Response: {status: 401, statusText: "Unathorized", data: null}}, {status: 401});
    }
    
}