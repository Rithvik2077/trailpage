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
        const data = await client.query(query);
        client.end();
        return data;
    }catch(error) {
        client.end();
        return {
            status: 500,
            statusText: "Internal server error",
            message: error. message,
            error: error,
            data: null,
        }
    }
}

export async function GetFeedbacks() {
    const client = await db.connect();
    try{
        const query = {
            text: "select * from feedbacks",
            values: [],
        }
        const data = await client.quety();
        client.end();
        return data;
    }catch(error) {
        client.end();
        return {
            status: 500,
            statusText: "Internal server error",
            message: error. message,
            error: error,
            data: null,
        }
    }
}