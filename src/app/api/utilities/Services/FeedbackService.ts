import { Database } from "@/types/database.types";
import {AddFeedback, GetFeedbacks, MarkViewed} from "../Repository/FeedbacksRepository";
import {Tables} from "@/types/Dto";

type FeedbackInsert = Database["public"]["Tables"]["Feedback"]["Insert"];
type FeedbackDTO = Tables["Feedback"];

export async function AddNewFeedback(FeedbackDto: {title: string, feedback: string, created_by: number | null}) {
   try{
        const feedback = {
            title: FeedbackDto.title,
            description: FeedbackDto.feedback,
            created_by: FeedbackDto.created_by,
        }
        const result = await AddFeedback(feedback);
        return result;
   }
    catch (error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetAllFeedbacks(){
    try {
        const result = await GetFeedbacks();
        return result;
    }catch (error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function UpdateStatus(id: number) {
    try {
        const result = await MarkViewed(id);
        return result;
    }catch (error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}