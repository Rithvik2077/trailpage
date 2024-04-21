import {supabase} from "../Data/DbConnect";
import { Database } from "@/types/database.types";
import {db} from "../Data/RenderConnect";

type UserRowType = Omit<Database["public"]["Tables"]["User"]["Row"], 'id'>;

// type UserRowType = {
//     email: string;
//     id: number;
//     is_active: boolean;
//     password: string;
//     updated_at: string;
//     user_name: string;
// }

// export const AddUserAsync = async (User: UserRowType) => {
//     const client = await db.connect();
//     try{
//         const result = await supabase.from('User').insert(User);
//         return result;
//     }catch(error) {
//         return {
//             status: 500,
//             statusText: "Internal server error",
//             data: null,
//         }
//     }
// }

export async function GetUserById(id: number) {
    const client = await db.client();
    try {
        const query = {
            text: "select id, username, email from users where id=$1",
            values: [id]
        }
        const result = await client.query(query);
        client.end();
        return result;
    } catch(error) {
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

export async function GetAllUsers() {
    const client = await db.connect();
    try {
        const query = {
            text: "select id, username, email from users",
            values: []
        }
        const result = await client.query(query);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        }
    } catch(error) {
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