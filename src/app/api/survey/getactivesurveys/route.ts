import { NextResponse } from "next/server";
import { GetAllSurveys } from "../../utilities/Services/SurveyService";
import { validateAndAuthorizeToken } from "../../utilities/helpers/tokenHelper";

export async function GET(req: Request) {
    if(!req.headers.get("authorization"))
        return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
    const token = req.headers.get('authorization')!.split(' ')[1];
    const res = validateAndAuthorizeToken(token, "any");
    if(res){
        const data = await GetAllSurveys(true);
        return NextResponse.json({Response: data}, {status: data.status});
    }
    return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
}