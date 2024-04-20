import {Database} from "@/types/database.types";
import {Options} from "@/types/Dto";
import { db } from "../Data/RenderConnect";

type TicketInsert = Database["public"]["Tables"]["Ticket"]["Insert"];

type TicketOptions = Options["TicketOptions"];

const table = 'tickets'

const ticket_select = `SELECT
tickets.id,
tickets.title,
tickets.description,
category.categoryname AS category,
ticketpriority.name AS priority,
ticketstatus.name AS status,
users_createdby.username AS createdby,
tickets.createdat,
users_assignedto.username AS assignedto,
users_closedby.username AS closedby,
tickets.closedat
FROM
    tickets
LEFT JOIN
    category ON tickets.subcategory_id = category.id
LEFT JOIN
    ticketpriority ON tickets.priority = ticketpriority.id
LEFT JOIN
    ticketstatus ON tickets.status = ticketstatus.id
LEFT JOIN
    users AS users_createdby ON tickets.createdby = users_createdby.id
LEFT JOIN
    users AS users_assignedto ON tickets.assignedto = users_assignedto.id
LEFT JOIN
    users AS users_closedby ON tickets.closedby = users_closedby.id`


export async function AddTicket(ticket: TicketInsert) {
    const client = await db.connect();
    try{
        const query = {
            text: "insert into tickets (title, description, subcategory_id, priority, status, createdby, assignedto) values ($1, $2, $3, $4, $5, $6, $7)",
            values: [ticket.title, ticket.description, ticket.sub_category_id, ticket.priority, ticket.status_id, ticket.created_by, ticket.assigned_to]
        }
        const result = await client.query(query);
        client.end();
        // const result = await supabase.from(table).insert(ticket);
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result
        };
    }catch(error) {
        client.end();
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
    const client = await db.connect();
    try{
        const query = {
            text: ticket_select+";",
        }
        const result = await client.query(query);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        };
    }catch(error) {
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

// export async function GetUserActiveTickets(id: number, status: string) {
//     const client = await db.connect();
//     try{
//         const query = {
//             text: "select * from ($1) where createdby = ($2) and status = ($3) order by ($4)",
//             values: [table, id, status, "createdat"],
//         }
//         const result = await client.query(query);
//         return {
//             status: 200,
//             statusText: `${result.command} completed successfully`,
//             result: result.rows
//         };
//     }catch(error) {
//         return {
//             error: error,
//             status: 500,
//             statusText: "Internal server error",
//             message: error.message,
//             data: null,
//         }
//     }finally{
//         client.end();
//     }
// }

export async function GetUserTickets(user_id: number, options: TicketOptions) {

    let query_text = ticket_select + ` where tickets.createdby = ($1)`
    const params = [user_id];

    if(options.group && options.group != 0) {
        query_text += ` and category.group_id = $${params.length+1}`;
        params.push(options.group);
    }
    if(options.priority && options.priority !=0) {
        query_text += ` and tickets.priority = $${params.length+1}`;
        params.push(options.priority);
    }
    if(options.status && options.status!=0) {
        query_text += ` and tickets.status = $${params.length+1}`;
        params.push(options.status);
    }
    if(options.closed_by && options.closed_by!=0) {
        query_text += ` and tickets.closedby= $${params.length+1}`;
        params.push(options.closed_by);
    }
    if(options.sub_category && options.sub_category!=0) {
        query_text += ` and tickets.subcategory_id = $${params.length+1}`;
        params.push(options.sub_category);
    }
    query_text += ";"
    const client = await db.connect();
    // console.log(query_text);
    try{
        const result = await client.query(query_text, params);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        }
    }catch(error) {
        console.log(error);
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetTicket(id: number) {
    const client = await db.connect();
    try {
        const query_text = `${ticket_select} where tickets.id = $1`;
        const values = [id];
        const result = await client.query(query_text, values);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        }
    } catch(error) {
        console.log(error);
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetAssignedTickets(user_id: number) {
    const client = await db.connect();
    try {
        const query_text = `${ticket_select} where tickets.assignedto = $1`;
        const values = [user_id];
        const result = await client.query(query_text, values);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        }
    } catch (error) {
        console.log(error);
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function AssignTicket(ticket_id: number, user_id: number) {
    const client = await db.connect();
    try {
        const query = {
            text: "update tickets set assignedto = $1 where id = $2",
            values: [user_id, ticket_id],
        }
        const result = await client.query(query);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        }
    } catch (error) {
        console.log(error);
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function UpdateTicketStatus(ticket_id: number, status: number) {
    const client = await db.connect();
    try {
        const query = {
            text: "update tickets set status = $1 where id = $2",
            values: [status, ticket_id],
        }
        const result = await client.query(query);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        }
    } catch (error) {
        console.log(error);
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetTicketData(ticket_id: number, options: {assignedto: boolean}) {
    const client = await db.connect();
    try {
        const query = {
            text: "select assignedto from tickets where id = $1",
            values: [ticket_id]
        }
        const result = await client.query(query);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        }
    } catch (error) {
        console.log(error);
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetTicketStatusNameById(id: number) {
    const client = await db.connect();
    try {
        const query = {
            text: "select name from ticketstatus where id = $1",
            values: [id]
        }
        const result = await client.query(query);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        }
    } catch (error) {
        console.log(error);
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function CloseTicket(user_id, ticket_id, status) {
    const client = await db.connect();
    try {
        const closedAt = new Date().toISOString();
        const query = {
            text: "update tickets set status=$1, closedby=$2, closedat=$3 where id=$4;",
            values: [status, user_id, closedAt, ticket_id]
        };
        const result = await client.query(query);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        }
    } catch (error) {
        console.log(error);
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

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