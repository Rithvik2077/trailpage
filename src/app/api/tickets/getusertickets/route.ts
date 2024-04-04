import { NextResponse } from "next/server";
import {GetTickets_user} from "../../utilities/Services/TicketService";
import {Requests} from "@/types/Dto";
import {validateAndAuthorizeToken, GetPayloadDetails} from "../../utilities/helpers/tokenHelper";

type Dto = Requests["UserTicket"];
export async function POST(req: Request) {
    
    const dto: Dto = await req.json();
    if(!dto) {
        return NextResponse.json({Error: "Body is empty"});
    }
    const result = await GetTickets_user(dto.user_id, dto.options);
    return NextResponse.json({Response: result}, {status: result.status});
}