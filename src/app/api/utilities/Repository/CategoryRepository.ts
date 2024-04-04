import { Database } from "@/types/database.types";
import {supabase} from "../Data/DbConnect";

type Insert = Database["public"]["Tables"]["Category"]["Insert"]

export async function AddCategory(category: Insert) {
    try{
        const result = await supabase.from('Category').insert(category);
        return result;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}

export async function GetAllCategories() {
    try {
        const result = await supabase.from('Category').select();
        return result;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}

export async function GetAllCategoriesByGroup(id: number){
    try{
        const result = await supabase.from('Category').select().eq('group_id', id);
        return result;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}