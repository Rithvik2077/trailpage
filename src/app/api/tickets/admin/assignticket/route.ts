import { NextRequest, NextResponse } from 'next/server';
import {AssignTicketService} from '../../../utilities/Services/TicketService';
import { validateAndAuthorizeToken } from '@/app/api/utilities/helpers/tokenHelper';
import { cookies } from 'next/headers';

export async function POST(req :NextRequest) {
    const auth = cookies().get('Authorize')
    const token = auth.value;
    const res = validateAndAuthorizeToken(token, 'admin');
    if(res) {
        const body = await req.json();
        if(!body.user_id || !body.ticket_id) {
            return NextResponse.json({Response: { status: 400, statusText: "Invalid body. required ticket_id and user_id but not found in body", data: null }}, {status: 400});
        }
        const result = await AssignTicketService(body.user_id, body.ticket_id);
        return NextResponse.json({Response: result}, {status: result.status});
    }
    else {
        return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
    }
}