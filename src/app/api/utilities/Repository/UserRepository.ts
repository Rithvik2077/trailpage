import {supabase} from "../Data/DbConnect";
import { Database } from "@/types/database.types";

type UserRowType = Omit<Database["public"]["Tables"]["User"]["Row"], 'id'>;

// type UserRowType = {
//     email: string;
//     id: number;
//     is_active: boolean;
//     password: string;
//     updated_at: string;
//     user_name: string;
// }

export const AddUserAsync = async (User: UserRowType) => {
    const result = await supabase.from('User').insert(User);
    if(result.error){
        console.log(result.error.message);
    }
    return result;
}