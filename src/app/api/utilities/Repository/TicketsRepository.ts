import { PostgrestSingleResponse } from "@supabase/supabase-js";
import {supabase} from "../Data/DbConnect";
import {Database} from "@/types/database.types";
import {Options} from "@/types/Dto";

type TicketInsert = Database["public"]["Tables"]["Ticket"]["Insert"];
type TicketType = Database["public"]["Tables"]["Ticket"]["Row"];

type TicketOptions = Options["TicketOptions"];

const table = 'Ticket'

export async function AddTicket(ticket: TicketInsert) {
    const result = await supabase.from(table).insert(ticket);
    if(result.error){
        console.log(result.error.message);
    }
    return result;
}

export async function GetAllTickets(): Promise<TicketType[]>{
    const data = await supabase.from(table).select().then(res => res.data);
    return data;
}

// export async function GetUserTickets(id: number): Promise<PostgrestSingleResponse<TicketType[]>> {
//     const data = await supabase.from(table).select().eq('created_by', id).order('created_at');
//     return data;
// }

export async function GetUserActiveTickets(id: number, status: string) {
    const data = await supabase.from(table).select().eq('created_by', id).eq('status', status).order('created_at');
    return data;
}

export async function GetUserTickets(user_id: number, options: TicketOptions) {
    const data = await supabase.from(table).select('*, Category!inner(*)').eq('Category.group_id', 6).eq('user_id', 22);
    if(data.error)
    return data;
}

