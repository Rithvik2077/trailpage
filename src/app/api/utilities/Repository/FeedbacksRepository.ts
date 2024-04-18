import { Database } from "@/types/database.types";
import {supabase} from "../Data/DbConnect";
import { db } from "../Data/RenderConnect";

type FeedbackInsert = Database["public"]["Tables"]["Feedback"]["Insert"];
// FeedbackInsert = {
//     created_at?: string;
//     created_by?: number;
//     description?: string;
//     id?: number;
//     title?: string;
// }
export async function AddFeedback(Feedback: FeedbackInsert) {
    const client = await db.connect();
    try {
        const query = {
            text: "insert into feedbacks (title, description, createdby) values ($1, $2, $3)",
            values: [Feedback.created_at, Feedback.created_by, ]
        }
        const data = await supabase.from('Feedback').insert(Feedback);
        return data;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}

export async function GetFeedbacks() {
    try{
        const data = await supabase.from('Feedback').select("*");
        return data;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}