import { NextResponse } from "next/server";
// import {GetRowByCategory} from "../../utilities/Repository/UserRoleMappingRespository";
import {CreateTicket, GetTickets_user} from "../../utilities/Services/TicketService";
// import { Database } from "@/types/database.types";
import {Tables, Options} from "@/types/Dto";

// type insert = Database["public"]["Tables"]["UserRoleMapping"]["Insert"]
type TicketDTO = Tables["Ticket"];
type optins = Options["TicketOptions"];

export async function GET(req: Request) {
    const op: optins = {
        status: 0,
        sub_category: 0,
        group: 0,
        priorty: 0,
        closed_by: 0,
    }
    const data = await GetTickets_user(22, op);
    // console.log(data);
    return NextResponse.json({result: data});
}