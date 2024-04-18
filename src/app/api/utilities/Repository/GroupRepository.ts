import {supabase} from "../Data/DbConnect"
import {Database} from "@/types/database.types"
import { db } from "../Data/RenderConnect";


type GroupType = Omit<Database["public"]["Tables"]["Group"]["Row"], "id">;
// type CategoryType = Database["public"]["Tables"]["Category"]["Row"]
export async function AddGroup(Group: GroupType){
    const client = await db.connect();
    try{
        const query = {
            text: "Insert into groups (groupname) values ($1)",
            values: [Group.name]
        }
        const result = await client.query(query);
        client.end();
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

export async function GetGroups() {
    const client = await db.connect();
    try{
        const query = {
            text: "select * from groups",
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