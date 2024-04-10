import { NextResponse } from 'next/server';
import {GetTickets} from '../../../utilities/Services/TicketService';
import { validateAndAuthorizeToken } from '@/app/api/utilities/helpers/tokenHelper';

export async function GET(req :Request) {
    if(!req.headers.get("authorization"))
        return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
    const token = req.headers.get('authorization')!.split(' ')[1];
    const res = validateAndAuthorizeToken(token, 'admin');
    if(res) {
        const result = await GetTickets();
        return NextResponse.json({Response: result}, {status: result.status});
    }
    else {
        return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
    }
}