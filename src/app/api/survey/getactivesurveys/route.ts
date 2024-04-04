import { NextResponse } from "next/server";
import { GetAllSurveys } from "../../utilities/Services/SurveyService";

export async function GET(req: Request) {
    const data = await GetAllSurveys(true);
    return NextResponse.json({Response: data}, {status: data.status});
}