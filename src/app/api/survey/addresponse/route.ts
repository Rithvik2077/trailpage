import { NextResponse } from "next/server";
import {CreateResponse} from "../../utilities/Services/SurveyService";
import {Json} from "@/types/database.types";
import { validateAndAuthorizeToken, GetPayloadDetails } from "../../utilities/helpers/tokenHelper";

interface SurveyResponse {
    user_id: number;
    survey_id: number;
    response_data: Json; 
}
export async function POST(req:Request) {
    if(!req.headers.get("authorization"))
        return NextResponse.json({status: 401, statusText: "Unathorized (no token)", data: null}, {status: 401});
    const token = req.headers.get('authorization')!.split(' ')[1];
    const res = validateAndAuthorizeToken(token, "any");
    if(res) {
        const data: SurveyResponse = await req.json();

        // if (typeof data.user_id !== 'number' || isNaN(data.user_id)) {
        //     return NextResponse.json({ status: 400, statusText: "user_id is not a number or is undefined" }, {status: 400});
        // }
    
        if (typeof data.survey_id !== 'number' || isNaN(data.survey_id)) {
            return NextResponse.json({status: 400, statusText: "survey_id is not a number or is undefined" }, {status: 400});
        }
        const id = parseInt(GetPayloadDetails(token, "id"));

        if(!data.user_id || data.user_id === id) {
            const result = await CreateResponse(data);
            return NextResponse.json({Response: result}, {status: result.status});
        }
        else {
            return NextResponse.json({status: 400, statusText: "A user can only repond to his survey", data: null}, {status: 401});
        }
    }
    return NextResponse.json({status: 401, statusText: "Unathorized (invalid token)", data: null}, {status: 401});
}