// import {supabase} from "../Data/DbConnect";
// import { Database } from "@/types/database.types";

// type UserRowType = Omit<Database["public"]["Tables"]["User"]["Row"], 'id'>;

// // type UserRowType = {
// //     email: string;
// //     id: number;
// //     is_active: boolean;
// //     password: string;
// //     updated_at: string;
// //     user_name: string;
// // }

// export const AddUserAsync = async (User: UserRowType) => {
//     try{
//         const result = await supabase.from('User').insert(User);
//         return result;
//     }catch(error) {
//         return {
//             status: 500,
//             statusText: "Internal server error",
//             data: null,
//         }
//     }
// }