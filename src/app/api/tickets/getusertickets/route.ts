import { NextRequest, NextResponse } from "next/server";
import {GetTickets_user} from "../../utilities/Services/TicketService";
import {Requests} from "@/types/Dto";
import {validateAndAuthorizeToken, GetPayloadDetails} from "../../utilities/helpers/tokenHelper";
import { Cookie } from "next/font/google";
import { cookies } from "next/headers";

type Dto = Requests["UserTicket"];
export async function POST(req: NextRequest) {
    const auth = cookies().get('Authorize')
    const token = auth.value;
    const isValid = validateAndAuthorizeToken(token, "any")
    if(isValid) {
        const dto: Dto = await req.json();
        if(!dto) {
            return NextResponse.json({Response: {stats: 400,statusText: "Body is empty", data: null}}, {status: 400});
        }
        if(validateDto(dto)) {
            const id = GetPayloadDetails(token, "id");
            const role = GetPayloadDetails(token, "role");
            let user_id;
            if(role.toLocaleLowerCase() != "admin") {
                user_id = id;
            }
            else {
                user_id = dto.user_id?dto.user_id:id;
            }
            const result = await GetTickets_user(user_id, dto.options);
            return NextResponse.json({Response: result}, {status: result.status});
        }else {
            return NextResponse.json({Response : {status: 400, statusText: "One or many body parameters are invalid", data: null}}, {status: 400});
        }
    }else {
        return NextResponse.json({Response: {status: 401, statusText: "Unathorized", data: null}}, {status: 401});
    }
    
}

function validateDto(obj: any): obj is Dto {
    // console.log(obj);
    if (!obj.options || typeof obj.options !== 'object') return false;

    const { status, sub_category, group, priority, closed_by } = obj.options;
    if (
        typeof status !== 'number' ||
        typeof sub_category !== 'number' ||
        typeof group !== 'number' ||
        typeof priority !== 'number' ||
        typeof closed_by !== 'number'
    ) {
        return false;
    }

    return true;
}