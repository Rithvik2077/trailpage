import { Database } from "@/types/database.types";
import {supabase} from "../Data/DbConnect";

type UserRoleInsert = Database["public"]["Tables"]["UserRoleMapping"]["Insert"];
const table = "UserRoleMapping";

export async function AddUserRoleMapping(UserRole: UserRoleInsert){
    const result = supabase.from(table).insert(UserRole);
    return result;
}

export async function GetRowByCategory(sub_category_id: number) {
    const result = await supabase.from(table).select().eq("sub_category_id", sub_category_id);
    return result;
}