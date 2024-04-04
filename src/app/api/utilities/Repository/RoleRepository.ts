import {supabase} from "../Data/DbConnect";
import {Database} from "@/types/database.types";

type RoleInsert = Database["public"]["Tables"]["Role"]["Insert"];

const table = 'Role'

export async function AddRole(role: RoleInsert) {
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

export async function GetAllRoles(){
    try{
        const result = await supabase.from(table).select();
        return result;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}