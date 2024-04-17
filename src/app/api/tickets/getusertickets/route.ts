import { NextResponse } from "next/server";
import {GetTickets_user} from "../../utilities/Services/TicketService";
import {Requests} from "@/types/Dto";
import {validateAndAuthorizeToken, GetPayloadDetails} from "../../utilities/helpers/tokenHelper";

type Dto = Requests["UserTicket"];
export async function POST(req: Request) {
    if(!req.headers.get("authorization"))
        return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
    const token = req.headers.get('authorization')!.split(' ')[1];
    const isValid = validateAndAuthorizeToken(token, "user")
    if(isValid) {
        const dto: Dto = await req.json();
        if(!dto) {
            return NextResponse.json({Response: {stats: 400,statusText: "Body is empty", data: null}}, {status: 400});
        }
        if(validateDto(dto)) {
            const id = GetPayloadDetails(token, "id");
            if(id != dto.user_id) {
                return NextResponse.json({Response: {status: 400, statusText: "User can add only his ticket", data: null}}, {status: 400});
            }
            const result = await GetTickets_user(dto.user_id, dto.options);
            return NextResponse.json({Response: result}, {status: result.status});
        }else {
            return NextResponse.json({Response : {status: 400, statusText: "One or many body parameters are invalid", data: null}}, {status: 400});
        }
    }else {
        return NextResponse.json({Response: {status: 401, statusText: "Unathorized", data: null}}, {status: 401});
    }
    
}

function validateDto(obj: any): obj is Dto {
    if (typeof obj.user_id !== 'number') return false;

    if (!obj.options || typeof obj.options !== 'object') return false;

    const { status, sub_category, group, priorty, closed_by } = obj.options;
    if (
        typeof status !== 'number' ||
        typeof sub_category !== 'number' ||
        typeof group !== 'number' ||
        typeof priorty !== 'number' ||
        typeof closed_by !== 'number'
    ) {
        return false;
    }

    return true;
}