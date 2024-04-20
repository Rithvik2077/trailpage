import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { validateAndAuthorizeToken,GetPayloadDetails } from "../../utilities/helpers/tokenHelper";
import {GetUserAssignedTickets} from "../../utilities/Services/TicketService";

export async function GET(req: NextRequest) {
    const auth = cookies().get('Authorize');
    const token = auth.value;
    
    const res = validateAndAuthorizeToken(token, "any");
    if(res) {
        try {
            const user_id = parseInt(GetPayloadDetails(token, "id"));
            const tickets = await GetUserAssignedTickets(user_id);
            return NextResponse.json({Response: tickets}, {status: tickets.status});
        }catch(error){
            return NextResponse.json({status: 400, statusText: error}, {status:400});
        }
    }
    return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
}