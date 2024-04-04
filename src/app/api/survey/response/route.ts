import { NextResponse } from "next/server";
import {CreateResponse} from "../../utilities/Services/SurveyService";
import {Json} from "@/types/database.types";

interface SurveyResponse {
    user_id: number;
    survey_id: number;
    response_data: Json; 
}
export async function POST(req:Request) {
    const data = await req.json();
    if (typeof data.user_id !== 'number' || isNaN(data.user_id)) {
        return NextResponse.json({ status: 400, statusText: "user_id is not a number or is undefined" }, {status: 400});
    }

    if (typeof data.survey_id !== 'number' || isNaN(data.survey_id)) {
        return NextResponse.json({status: 400, statusText: "survey_id is not a number or is undefined" }, {status: 400});
    }
    const result = await CreateResponse(data);
    return NextResponse.json({Response: result}, {status: data.status});
}