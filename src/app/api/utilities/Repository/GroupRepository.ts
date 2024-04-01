import {supabase} from "../Data/DbConnect"
import {Database} from "@/types/database.types"


type GroupType = Omit<Database["public"]["Tables"]["Group"]["Row"], "id">;
// type CategoryType = Database["public"]["Tables"]["Category"]["Row"]
export async function AddGroupAsync(Group: GroupType){
    const result = await supabase.from('Group').insert(Group);
    console.log(result);
    if(result.error){
        console.log(result.error.message);
    }
    return result;
}