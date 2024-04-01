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
        status: "Open",
        sub_category: 1,
        group: 2,
        priorty: 1,
    }
    const data = await GetTickets_user(22, op);
    console.log(data);
    return NextResponse.json({result: data});
}

// const Ticket: TicketDTO = {
    //     sub_category_id: 2,
    //     priority: 1,
    //     description: "Having Problem with wifi",
    // };
    // const result = CreateTicket(Ticket, 19);
    // return NextResponse.json({result: result});