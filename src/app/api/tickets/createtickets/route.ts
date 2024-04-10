import {Tables} from "@/types/Dto";
import {CreateTicket} from "../../utilities/Services/TicketService";
import { NextResponse } from "next/server";
import {validateAndAuthorizeToken, GetPayloadDetails} from "../../utilities/helpers/tokenHelper";

type TicketInsert = Tables["Ticket"];

interface Ticket {
    sub_category_id: number,
    priority: number,
    title: string,
    description: string,
    created_by: number,
}

export async function POST(req: Request) {
    if(!req.headers.get("authorization"))
        return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
    const token = req.headers.get('authorization')!.split(' ')[1];
    const res = validateAndAuthorizeToken(token, 'any');
    if(res) {
        const ticket: Ticket = await req.json();

        if(!ticket) {
            return NextResponse.json({Error: "Body is empty"});
        }
        if (typeof ticket.sub_category_id !== 'number' || ticket.sub_category_id < 0 || typeof ticket.sub_category_id === 'undefined') {
            console.log("jjhhh");
            return NextResponse.json({Response: { status: 400, statusText: "Invalid sub_category_id", data: null }}, {status: 400});
        }
    
        if (typeof ticket.priority !== 'number' || ticket.priority < 0 || typeof ticket.priority === 'undefined') {
            return NextResponse.json({Response: { status: 400, statusText: "Invalid priority", data: null }}, {status: 400});
        }
    
        if (typeof ticket.title !== 'string' || ticket.title.trim() === '' || typeof ticket.title === 'undefined') {
            return NextResponse.json({Response: { Estatus: 400,statusText: "Invalid title", data: null }}, {status: 400});
        }
    
        if (typeof ticket.description !== 'string' || ticket.description.trim() === '' || typeof ticket.description === 'undefined') {
            return NextResponse.json({Response: { status: 400, statusText: "Invalid description", data: null }}, {status: 400});
        }
        
        ticket.created_by = GetPayloadDetails(token, "id");

        const result = await CreateTicket(ticket);
        return NextResponse.json({Response: result}, {status: result.status});
    }
    else {
        return NextResponse.json({Response: {status: 401, statusText: "Unathorized", data: null}}, {status: 401});
    }
}