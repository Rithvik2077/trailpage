import { Database } from "@/types/database.types";
import {supabase} from "../Data/DbConnect";

type FeedbackInsert = Database["public"]["Tables"]["Feedback"]["Insert"];

export async function AddFeedback(Feedback: FeedbackInsert) {
    try {
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