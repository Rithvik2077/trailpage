import {supabase} from "../Data/DbConnect";
import {Database} from "@/types/database.types";

type RoleInsert = Database["public"]["Tables"]["Role"]["Insert"];

const table = 'Role'

export async function AddRole(role: RoleInsert) {
    const result = await supabase.from(table).insert(role);
    if(result.error){
        return {
            error: result.error.message
        }
    }
    return result;
}

export async function GetAllRoles(){
    const result = await supabase.from(table).select();
    return result;
}