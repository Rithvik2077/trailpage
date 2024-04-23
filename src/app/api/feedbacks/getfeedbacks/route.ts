import { cookies } from "next/headers";
import { validateAndAuthorizeToken,GetPayloadDetails } from "../../utilities/helpers/tokenHelper";
import { GetAllFeedbacks } from "../../utilities/Services/FeedbackService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const auth = cookies().get('Authorize')
    const token = auth.value;
    const res = validateAndAuthorizeToken(token, "any");
    if(res) {
        const url = new URL(req.url)
        
        const viewed = url.searchParams.get('notviewed')?
                                    url.searchParams.get('notviewed') === "true"?true:false
                                    :null;
        // console.log(viewed);
        const id = parseInt(GetPayloadDetails(token, "id"));
        const result = await GetAllFeedbacks(id, viewed);
        return NextResponse.json({Response: result}, {status: result.status});
    }
    return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401})
}