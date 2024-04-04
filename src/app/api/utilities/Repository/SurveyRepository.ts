import {supabase} from "../Data/DbConnect";
import { Database } from "@/types/database.types";

type SurveyInsert = Database["public"]["Tables"]["Survey"]["Insert"];
type SurveyResponseInsert = Database["public"]["Tables"]["SurveyResponses"]["Insert"];

const SurveyTable = "Survey";
const ResponseTable = "SurveyResponses";

export async function AddSurvey(survey: SurveyInsert){
    try{
        const data = supabase.from(SurveyTable).insert(survey);
        return data;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}

export async function GetSurveys(active: boolean) {
    const query = supabase.from(SurveyTable).select("*");
    if(active){
        const currentTimeStamp = new Date().toISOString();
        query.gt('closes_at', currentTimeStamp)
    }
    try{
        const data = await query;
        return data;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}

export async function AddUserResponse(response: SurveyResponseInsert) {
    try{
        const result = await supabase.from(ResponseTable).insert(response);
        return result;
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}