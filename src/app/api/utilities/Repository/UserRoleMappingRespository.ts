import { Database } from "@/types/database.types";
import {supabase} from "../Data/DbConnect";

type UserRoleInsert = Database["public"]["Tables"]["UserRoleMapping"]["Insert"];
const table = "UserRoleMapping";

export async function AddUserRoleMapping(UserRole: UserRoleInsert){
    try{
        const result = supabase.from(table).insert(UserRole);
        return result;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}

export async function GetRowByCategory(sub_category_id: number) {
    try {
        const result = await supabase.from(table).select().eq("sub_category_id", sub_category_id);
        return result;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}