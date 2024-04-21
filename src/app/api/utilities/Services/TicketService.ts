import {AddTicket, GetAllTickets, GetUserTickets, GetTicket, GetAssignedTickets, AssignTicket, UpdateTicketStatus, GetTicketData, GetTicketStatusNameById, CloseTicket, GetTicketPriorities} from "../Repository/TicketsRepository";
import {GetRoleNameByUserId} from "../Repository/UserRoleMappingRespository";
import {GetRowByCategory} from "../Repository/UserRoleMappingRespository";
import {GetAllCategories} from "../Repository/CategoryRepository";
import {GetGroups} from "../Repository/GroupRepository";
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
        return result;
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
        return data;
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
        return result;
    }catch(error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            result: null,
        }
    }
}

export async function GetTicketById(id: number) {
    try {
        const result = await GetTicket(id);
        return result;
    }catch(error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            result: null,
        }
    }
}

export async function GetUserAssignedTickets(user_id: number) {
    try {
        const result = await GetAssignedTickets(user_id);
        return result;
    }catch (error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            result: null,
        }
    }
}

export async function AssignTicketTo(ticket_id: number, user_id: number) {
    try {
        const result = await AssignTicket(ticket_id, user_id);
        return result;
    } catch(error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            result: null,
        }
    }
}

export async function UpdateStatus(user_id: number, ticket_id: number, status: number) {
    try {
        const assigned_to = await GetTicketData(ticket_id, {assignedto: true});
        if(assigned_to.error) {
            return assigned_to;
        }else {
            if(assigned_to.result[0].assignedto != user_id) {
               const role = await GetRoleNameByUserId(user_id);
            //    console.log(role);
               if(role.error) {
                return role;
               }
               if(role.result[0].rolename.toLocaleLowerCase() !== "admin") {
                return {
                    status: 400,
                    statusText: "Bad Request. can't update the status of ticket",
                }
               }
            }
        }
        const ticketstatus_response = await GetTicketStatusNameById(status);
        if(ticketstatus_response.result[0].name.toLocaleLowerCase() === "closed") {
            const result = await CloseTicket(user_id, ticket_id, status);
            return result;
        }
        const result = await UpdateTicketStatus(ticket_id, status);
        return result;
    } catch(error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            result: null,
        }
    }
}

export async function AssignTicketService(user_id: number, ticket_id: number) {
    try {
        const result = await AssignTicket(ticket_id, user_id);
        return result;
    } catch(error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            result: null,
        }
    }
}

export async function GetFormData() {
    try {
        const group_result = await GetGroups();
        const category_result  = await GetAllCategories();
        const priority_result = await GetTicketPriorities();
        if(group_result.error || category_result.error || priority_result.error) {
            return group_result.error?group_result:category_result.error?category_result:priority_result;
        }
        const data = {
            groups: group_result.result,
            categories: category_result.result,
            priorities: priority_result.result,
        }
        return {
            status: 200,
            statusText: group_result.status,
            result: data,
        }
    } catch(error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            result: null,
        }
    }
}