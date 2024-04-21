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
        // console.log(Feedback)
        const query = {
            text: "insert into feedbacks (title, description, createdby) values ($1, $2, $3)",
            values: [Feedback.title, Feedback.description, Feedback.created_by]
        }
        const result = await client.query(query);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result,
        }
    }catch(error) {
        // console.log(error)
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

export async function GetFeedbacks(notViewed?: boolean) {
    const client = await db.connect();
    try{
        let query_text; 
        if(notViewed) {
            query_text = `select feedbacks.*,
            case
                when feedbacks.createdby is not null then users.username
                else NULL
            END AS createdby
            from feedbacks
            left join users
            on feedbacks.createdby = users.id where viewed=false`;
        }else {
            query_text = `select feedbacks.*,
            case
                when feedbacks.createdby is not null then users.username
                else NULL
            END AS createdby
            from feedbacks
            left join users
            on feedbacks.createdby = users.id`;   
        }
        console.log(query_text+" LLLLLLLLLLLL")
        query_text = `${query_text} ORDER BY createdat DESC`
        const result = await client.query(query_text);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        }
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

export async function MarkViewed(id: number) {
    const client = await db.connect();
    try {
        const query = {
            text: "update feedbacks set viewed = true where id = $1",
            values: [id]
        };
        const result = await client.query(query);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result,
        }
    } catch(error) {
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