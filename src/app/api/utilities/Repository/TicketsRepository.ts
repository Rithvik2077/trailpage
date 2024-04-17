import {supabase} from "../Data/DbConnect";
import {Database} from "@/types/database.types";
import {Options} from "@/types/Dto";

type TicketInsert = Database["public"]["Tables"]["Ticket"]["Insert"];
type TicketType = Database["public"]["Tables"]["Ticket"]["Row"];

type TicketOptions = Options["TicketOptions"];

const table = 'Ticket'

export async function AddTicket(ticket: TicketInsert) {
    try{
        const result = await supabase.from(table).insert(ticket);
        return result;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}

export async function GetAllTickets(){
    try{
        const data = await supabase.from(table).select("*");
    // console.log(data);
        return data;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}

export async function GetUserActiveTickets(id: number, status: string) {
    try{
        const data = await supabase.from(table).select().eq('created_by', id).eq('status', status).order('created_at');
        return data;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}

export async function GetUserTickets(user_id: number, options: TicketOptions) {
    const query = supabase.from(table).select('*, Category!inner(*)').eq('created_by', user_id);

    if(options.group!==0) {
        query.eq('Category.group_id', options.group);
    }
    if(options.priorty!==0) {
        query.eq('priority', options.priorty);
    }
    if(options.status!==0) {
        query.eq('status_id', options.status);
    }
    if(options.sub_category!=0) {
        query.eq('sub_category_id', options.sub_category);
    }

    try{
        const result = await query;
        return result;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}

