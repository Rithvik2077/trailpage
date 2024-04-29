import { NextResponse } from "next/server";
import { GetAllSurveys } from "../../utilities/Services/SurveyService";
import { validateAndAuthorizeToken } from "../../utilities/helpers/tokenHelper";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    const auth = cookies().get('Authorize')
    const token = auth.value;
    const res = validateAndAuthorizeToken(token, "any");
    if(res){
        const data = await GetAllSurveys(true);
        return NextResponse.json({Response: data}, {status: data.status});
    }
    return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
}