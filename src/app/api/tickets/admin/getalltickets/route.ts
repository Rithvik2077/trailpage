import { NextRequest, NextResponse } from 'next/server';
import {GetTickets} from '../../../utilities/Services/TicketService';
import { validateAndAuthorizeToken } from '@/app/api/utilities/helpers/tokenHelper';
import { cookies } from 'next/headers';

export async function GET(req :NextRequest) {
    const auth = cookies().get('Authorize')
    const token = auth.value;
    const res = validateAndAuthorizeToken(token, 'admin');
    if(res) {
        const result = await GetTickets();
        return NextResponse.json({Response: result}, {status: result.status});
    }
    else {
        return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
    }
}