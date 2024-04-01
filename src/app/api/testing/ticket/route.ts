import { NextResponse } from "next/server";
import {GetAllTickets, GetUserActiveTickets, GetUserTickets} from "../../utilities/Repository/TicketsRepository";

export async function GET(req: Request){
    
    // try {
    //     const result = await GetAllTickets();
    //     return NextResponse.json({data: result});
    // }
    // catch(error){
    //     return NextResponse.json({error: error});
    // }

    // try{
    //     const result = await GetUserTickets(20);
    //     return NextResponse.json({data: result.data});
    // }
    // catch(error){
    //     return NextResponse.json({error: error});
    // }

    // try {
    //     const result = await GetUserActiveTickets(20, "Open");
    //     return NextResponse.json({data: result});
    // }
    // catch(error) {
    //     return NextResponse.json({error: error});
    // }
}