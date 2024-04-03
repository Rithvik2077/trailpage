import { supabase } from "../Data/DbConnect";
import {AddTicket, GetAllTickets, GetUserActiveTickets, GetUserTickets} from "../Repository/TicketsRepository";
import {GetRowByCategory} from "../Repository/UserRoleMappingRespository";
import {Tables, Options} from "@/types/Dto";
import {Database} from "@/types/database.types";

type TicketInsertDB = Database["public"]["Tables"]["Ticket"]["Insert"];
type TicketDTO = Tables["Ticket"];
type TikcetTypes = Options["TicketOptions"];
    
export async function CreateTicket(ticket: TicketDTO, user_id: number) {
    const UserRoleRow = await GetRowByCategory(ticket.sub_category_id);
    const assigned_to = UserRoleRow.data?UserRoleRow.data[0].user_id:null;
    const Ticket: TicketInsertDB = {
        sub_category_id: ticket.sub_category_id,
        priority: ticket.priority,
        description: ticket.description,
        status: "Open",
        created_by: user_id, // need to fetch.
        assigned_to: assigned_to //need to fetch.
    };
    const result = await AddTicket(Ticket);
    if(result.error) {
        return {
            error: result.error.message,
        }
    }
    return {
        data: result.data,
    }
}

export async function GetTickets_user(user_id: number, ticketType: TikcetTypes) {
   try{
    const data = await GetUserTickets(user_id, ticketType);
    return {
        data: data.data,
    }
   }catch(error){
    return {
        error: error,
    }
   }
}