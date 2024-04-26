import {supabase} from "../Data/DbConnect";
import {Database} from "@/types/database.types";
import { db } from "../Data/RenderConnect";

type RoleInsert = Database["public"]["Tables"]["Role"]["Insert"];

const table = 'Role'

export async function AddRole(role: RoleInsert) {
    const client = await db.connect();
    try{
        const result = await supabase.from(table).insert(role);
        return result;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}

// export async function GetGroups() {
//     const client = await db.connect();
//     try{
//         const query = {
//             text: "select * from groups",
//         }
//         const result = await client.query(query);
//         client.end();
//         return {
//             status: 200,
//             statusText: `${result.command} completed successfully`,
//             result: result.rows
//         };
//     }catch(error) {
//         client.end();
//         return {
//             error: error,
//             status: 500,
//             statusText: "Internal server error",
//             message: error.message,
//             data: null,
//         }
//     }
// }

export async function GetAllRoles(){
    const client = await db.connect();
    try{
        const query = "select * from roles";
        const result = await client.query(query);
        return {
                status: 200,
                statusText: `${result.command} completed successfully`,
                result: result.rows
        };
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}