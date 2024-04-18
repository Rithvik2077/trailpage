import { NextResponse } from "next/server";
import {GetSurveyResponses} from "../../utilities/Services/SurveyService";
import { validateAndAuthorizeToken } from "../../utilities/helpers/tokenHelper";


export async function GET(req: Request) {
    if(!req.headers.get("authorization"))
        return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
    const token = req.headers.get('authorization')!.split(' ')[1];
    const res = validateAndAuthorizeToken(token, "any");
    if(res) {
        const url = new URL(req.url)
        if( url.searchParams.get('id') === null) {
            return NextResponse.json({status: 400, statusText: "Bad request: id should not be null"}, {status:400});
        }
        try{
            const id = parseInt(url.searchParams.get('id')!)
            const surveys = await GetSurveyResponses(id);
            return NextResponse.json({Response: surveys}, {status: surveys.status});
        }catch(error){
            return NextResponse.json({status: 400, statusText: error}, {status:400});
        }
    }
    return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
}