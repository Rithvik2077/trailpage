import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { validateAndAuthorizeToken, GetPayloadDetails } from "../../utilities/helpers/tokenHelper";
import {UpdateStatus} from "../../utilities/Services/TicketService";

export async function POST(req: NextRequest) {
    const auth = cookies().get('Authorize')
    const token = auth.value;
    const isValid = validateAndAuthorizeToken(token, "any")
    if(isValid) {
        const body = await req.json();
        // console.log(body);
        if(!body.ticket_id || !body.status) {
            return NextResponse.json({Response: { status: 400, statusText: "Invalid body. required ticket_id and status but not found in body", data: null }}, {status: 400});
        }
        const user_id = GetPayloadDetails(token, "id");
        const result = await UpdateStatus(user_id, body.ticket_id, body.status);
        return NextResponse.json({Response: result}, {status: result.status});
    }else {
        return NextResponse.json({Response: {status: 401, statusText: "Unathorized", data: null}}, {status: 401});
    }
}