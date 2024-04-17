import { Database } from "@/types/database.types";
import {AddFeedback, GetFeedbacks} from "../Repository/FeedbacksRepository";
import {Tables} from "@/types/Dto";

type FeedbackInsert = Database["public"]["Tables"]["Feedback"]["Insert"];
type FeedbackDTO = Tables["Feedback"];

export async function AddNewFeedback(FeedbackDto: FeedbackDTO) {
    const feedback: FeedbackInsert = {
        title: FeedbackDto.title,
        description: FeedbackDto.feedback,
        created_by: FeedbackDto.created_by,
    }
    const result = await AddFeedback(feedback);
    return {
        status: result.status,
        statusText: result.statusText
    }
}

export async function GetAllFeedbacks(){
    const result = await GetFeedbacks();
    return {
        status: result.status,
        statusText: result.statusText,
        data: result.data
    }
}