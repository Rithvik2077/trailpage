import { validateAndAuthorizeToken } from "@/app/api/utilities/helpers/tokenHelper";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {GetFormData} from "../../../utilities/Services/TicketService";

export async function GET(req: NextRequest) {
    const auth = cookies().get('Authorize')
    const token = auth.value;
    const res = validateAndAuthorizeToken(token, 'any');
    if(res) {
        const result = await GetFormData();
            return NextResponse.json({Response: result}, {status: result.status});
    }
    else {
        return NextResponse.json({Response: {status: 401, statusText: "Unathorized", data: null}}, {status: 401});
    }
}