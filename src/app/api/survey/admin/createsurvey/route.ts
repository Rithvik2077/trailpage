import { NextResponse } from "next/server";
import {CreateNewSurvey} from "../../../utilities/Services/SurveyService"
import { Json } from "@/types/database.types";

interface Survey {
    title: string;
    survey_fields: Json; 
    created_by: number;
    closes_at: string;
}

export async function POST(req: Request) {
    const request: Survey = await req.json();

    if (!request.title || typeof request.title !== 'string') {
        return NextResponse.json({ status: 400, statusText: "title is not defined or is not a string" }, {status: 400});
    }

    if (typeof request.created_by !== 'number' || isNaN(request.created_by)) {
        return NextResponse.json({ status: 400, statusText: "created_by is not defined or is not a number" }, {status: 400});
    }

    if (!request.closes_at || typeof request.closes_at !== 'string') {
        return NextResponse.json({ status: 400,statusText: "closes_at is not defined or is not a string" }, {status: 400});
    }

    const result = await CreateNewSurvey(request);
    return NextResponse.json({ Response: result }, {status: result.status});
}