import { NextResponse } from "next/server";
import {GetAllFeedbacks} from "../../../utilities/Services/FeedbackService";
import {validateAndAuthorizeToken} from "../../../utilities/helpers/tokenHelper";

export async function GET(req: Request) {
    if(!req.headers.get("authorization"))
        return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
    const token = req.headers.get('authorization')!.split(' ')[1];
    const res = validateAndAuthorizeToken(token, "Admin");
    if(res) {
        const result = await GetAllFeedbacks();
        return NextResponse.json({Response: result}, {status: result.status});
    }
    return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401})
}