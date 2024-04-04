import { NextResponse } from "next/server";
import {GetAllFeedbacks} from "../../../utilities/Services/FeedbackService";
import {validateAndAuthorizeToken} from "../../../utilities/helpers/tokenHelper";

export async function GET(req: Request) {
    const authHeader = req.headers.get('authorization');
    const res = validateAndAuthorizeToken(authHeader?.split(' ')[1], "Admin");
    if(res) {
        const result = await GetAllFeedbacks();
        return NextResponse.json({Response: result}, {status: result.status});
    }
    return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401})
}