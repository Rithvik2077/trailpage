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
            statusText: error,
            data: null,
        }
    }
}

export async function GetSurveyById(id: number, filter: string) {
    try{
        const result = await supabase.from(SurveyTable).select(filter).eq("id", id);
        return result;
    }catch(error) {
        return {
            status: 500,
            statusText:error,
            data: null,
        }
    }
}

export async function GetResponse(id: number) {
    try {
        const result = await supabase.from(ResponseTable).select('response_data, created_at, User!inner(user_name)').eq('survey_id', id);
        if(result.error) {
            return {
                status: 500,
                statusText: result.error.message,
                data: null,
            }
        }
        return {
            status: result.status,
            statusText: result.statusText,
            data: result.data,
        }
    }catch (error){
        return {
            status: 500,
            statusText:error,
            data: null,
        }
    }
}