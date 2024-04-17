import {supabase} from "../Data/DbConnect";
import {Database} from "@/types/database.types";
import {Options} from "@/types/Dto";
import { db } from "../Data/RenderConnect";

type TicketInsert = Database["public"]["Tables"]["Ticket"]["Insert"];
type TicketType = Database["public"]["Tables"]["Ticket"]["Row"];

type TicketOptions = Options["TicketOptions"];

const table = 'tickets'

// type TicketInsert = {
//     assigned_to?: number;
//     closed_at?: string;
//     closed_by?: number;
//     created_at?: string;
//     created_by?: number;
//     description?: string;
//     id?: number;
//     priority?: number;
//     status_id?: number;
//     sub_category_id?: number;
//     title?: string;
// }

// sub_category_id: ticket.sub_category_id,
//         priority: ticket.priority,
//         title: ticket.title,
//         description: ticket.description,
//         status_id: 1,
//         created_by: ticket.created_by,
//         assigned_to: assigned_to

export async function AddTicket(ticket: TicketInsert) {
    try{
        const client = await db.connect();
        const query = {
            text: "insert into ($1) (title, description, subcategory_id, priority, status, createdby, assignedto) values ($2, $3, $4, $5, $6, $7, $8)",
            values: [ticket.title, ticket.description, ticket.sub_category_id, ticket.priority, ticket.status_id, ticket.created_by, ticket.assigned_to]
        }
        const result = await client.query(query);
        // const result = await supabase.from(table).insert(ticket);
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result
        };
    }catch(error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetAllTickets(){
    try{
        const client = await db.connect();
        const query = {
            text: "select * from ($1)",
            values: [table],
        }
        const result = await client.query(query);
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result
        };
    }catch(error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetUserActiveTickets(id: number, status: string) {
    try{
        const client = await db.connect();
        const query = {
            text: "select * from ($1) where createdby = ($2) and status = ($3) order by ($4)",
            values: [table, id, status, "createdat"],
        }
        const result = await client.query(query);
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result
        };
    }catch(error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetUserTickets(user_id: number, options: TicketOptions) {
    const query = supabase.from("Ticket").select('*, Category!inner(*)').eq('created_by', user_id);

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
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

