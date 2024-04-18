import {AddTicket, GetAllTickets, GetUserTickets} from "../Repository/TicketsRepository";
import {GetRowByCategory} from "../Repository/UserRoleMappingRespository";
import {Tables, Options} from "@/types/Dto";
import {Database} from "@/types/database.types";

type TicketInsertDB = Database["public"]["Tables"]["Ticket"]["Insert"];
type TicketDTO = Tables["Ticket"];
type TicketOptions = Options["TicketOptions"];
    
export async function CreateTicket(ticket: TicketDTO) {
    try {
        const UserRoleRow = await GetRowByCategory(ticket.sub_category_id);
        const Ticket: TicketInsertDB = {
            sub_category_id: ticket.sub_category_id,
            priority: ticket.priority,
            title: ticket.title,
            description: ticket.description,
            status_id: 1,
            created_by: ticket.created_by,
            assigned_to: UserRoleRow.data?UserRoleRow.data.length!=0?UserRoleRow.data[0].user_id:null:null,
        };
        const result = await AddTicket(Ticket);
        if(result.error) {
            return result;
        }
        return {
            status: result.status,
            statusText: result.statusText,
            data: null
        }
    } catch(error) {
        console.log(error);
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetTickets_user(user_id: number, options: TicketOptions) {
    try {
        const data = await GetUserTickets(user_id, options);
        return {
            status: data.status,
            statusText: data.statusText,
            data: data.result
        }
    }catch(error){
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetTickets() {
    try {
        const result = await GetAllTickets();
        return {
            status: result.status,
            statusText: result.statusText,
            data: result.result
        }
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