import {supabase} from "../Data/DbConnect"
import {Database} from "@/types/database.types"


type GroupType = Omit<Database["public"]["Tables"]["Group"]["Row"], "id">;
// type CategoryType = Database["public"]["Tables"]["Category"]["Row"]
export async function AddGroupAsync(Group: GroupType){
    try{
        const result = await supabase.from('Group').insert(Group);
        return result;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}