import { NextResponse } from "next/server";
import {GetAllFeedbacks} from "../../../utilities/Services/FeedbackService";
import {validateAndAuthorizeToken} from "../../../utilities/helpers/tokenHelper";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    const auth = cookies().get('Authorize')
    const token = auth.value;
    const res = validateAndAuthorizeToken(token, "admin");
    if(res) {
        const result = await GetAllFeedbacks();
        return NextResponse.json({Response: result}, {status: result.status});
    }
    return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401})
}