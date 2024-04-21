import { NextResponse } from "next/server";
import {CreateNewSurvey} from "../../../utilities/Services/SurveyService"
import { Json } from "@/types/database.types";
import { validateAndAuthorizeToken, GetPayloadDetails } from "@/app/api/utilities/helpers/tokenHelper";
import { cookies } from "next/headers";

interface Survey {
    title: string;
    survey_fields: Json; 
    created_by: number;
    closes_at: string;
}

export async function POST(req: Request) {
    const auth = cookies().get('Authorize')
    const token = auth.value;
    const res = validateAndAuthorizeToken(token, "any");
    if(res){
        const request: Survey = await req.json();

        if (!request.title || typeof request.title !== 'string') {
            return NextResponse.json({ status: 400, statusText: "title is not defined or is not a string" }, {status: 400});
        }
    
        // if (typeof request.created_by !== 'number' || isNaN(request.created_by)) {
        //     return NextResponse.json({ status: 400, statusText: "created_by is not defined or is not a number" }, {status: 400});
        // }
    
        if (!request.closes_at || typeof request.closes_at !== 'string') {
            return NextResponse.json({ status: 400,statusText: "closes_at is not defined or is not a string" }, {status: 400});
        }
        const user_id = GetPayloadDetails(token, "id");
        request.created_by = user_id;
        // console.log(request);
    
        const result = await CreateNewSurvey(request);
        return NextResponse.json({ Response: result }, {status: result.status});
    }
    return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
}