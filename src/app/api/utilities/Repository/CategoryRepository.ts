import { Database } from "@/types/database.types";
import {supabase} from "../Data/DbConnect";

type Insert = Database["public"]["Tables"]["Category"]["Insert"]

export async function AddCategory(category: Insert) {
    const result = await supabase.from('Category').insert(category);
    if(result.error){
        console.log(result.error.message);
    }
}

export async function GetAllCategories() {
    const result = await supabase.from('Category').select();
    return result;
}

export async function GetAllCategoriesByGroup(id: number){
    const result = await supabase.from('Category').select().eq('group_id', id);
    return result;
}