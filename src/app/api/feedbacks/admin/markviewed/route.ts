import { validateAndAuthorizeToken } from "@/app/api/utilities/helpers/tokenHelper";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UpdateStatus } from "@/app/api/utilities/Services/FeedbackService";

export async function PUT(req: NextRequest) {
    const auth = cookies().get('Authorize')
    const token = auth.value;
    const res = validateAndAuthorizeToken(token, "admin");
    if(res) {
        const url = new URL(req.url)
        if( url.searchParams.get('id') === null) {
            return NextResponse.json({status: 400, statusText: "Bad request: id should not be null"}, {status:400});
        }
        try{
            const id = parseInt(url.searchParams.get('id')!)
            const surveys = await UpdateStatus(id);
            return NextResponse.json({Response: surveys}, {status: surveys.status});
        }catch(error){
            return NextResponse.json({status: 400, statusText: error}, {status:400});
        }
    }
    return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401})
}