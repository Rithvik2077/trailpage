import { NextRequest, NextResponse } from "next/server";
import { GetSurvey } from "../../utilities/Services/SurveyService";
import { cookies } from "next/headers";
import { validateAndAuthorizeToken } from "../../utilities/helpers/tokenHelper";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const auth = cookies().get('Authorize');
    if(!auth) {
        return NextResponse.json({status: 401, statusText: "Unathorized. no auth provided", data: null}, {status: 401});
    }
    const token = auth.value;
    
    const res = validateAndAuthorizeToken(token, "any");
    if(res) {
        const url = new URL(req.url)
        if( url.searchParams.get('id') === null) {
            return NextResponse.json({status: 400, statusText: "Bad request: id should not be null"}, {status:400});
        }
        try {
            const id = parseInt(url.searchParams.get('id')!)
            const surveys = await GetSurvey(id);
            return NextResponse.json({Response: surveys}, {status: surveys.status});
        }catch(error) {
            return NextResponse.json({status: 400, statusText: error}, {status:400});
        }
    }else {
        return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
    }
}