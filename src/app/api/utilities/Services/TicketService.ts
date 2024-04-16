import {AddTicket, GetAllTickets, GetUserActiveTickets, GetUserTickets} from "../Repository/TicketsRepository";
import {GetRowByCategory} from "../Repository/UserRoleMappingRespository";
import {Tables, Options} from "@/types/Dto";
import {Database} from "@/types/database.types";

type TicketInsertDB = Database["public"]["Tables"]["Ticket"]["Insert"];
type TicketDTO = Tables["Ticket"];
type TicketOptions = Options["TicketOptions"];
    
export async function CreateTicket(ticket: TicketDTO) {
    console.log("ok");
    const UserRoleRow = await GetRowByCategory(ticket.sub_category_id);
    const assigned_to = UserRoleRow.data?UserRoleRow.data[0]?.user_id:null;
    console.log("doky");
    const Ticket: TicketInsertDB = {
        sub_category_id: ticket.sub_category_id,
        priority: ticket.priority,
        title: ticket.title,
        description: ticket.description,
        status_id: 1,
        created_by: ticket.created_by,
        assigned_to: assigned_to
    };
    const result = await AddTicket(Ticket);
    return {
        status: result.status,
        statusText: result.statusText,
        data: null
    }
}

export async function GetTickets_user(user_id: number, options: TicketOptions) {
    const data = await GetUserTickets(user_id, options);
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    }
    
}

export async function GetTickets() {
    const result = await GetAllTickets();
    // console.log(result);
    if(result.error) {
        return {
            status: result.status,
            statusText: `${result.error.message}     Hint: ${result.error.hint}`
        }
    }
    return {
        status: result.status,
        statusText: result.statusText,
        data: result.data,
    }
}