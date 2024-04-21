import {Tables} from "@/types/Dto";
import { Database } from "@/types/database.types";

import {AddSurvey, GetSurveys, AddUserResponse, GetSurveyById, GetSurveyResponse, GetResponseById} from "../Repository/SurveyRepository";
import {GetRowByuserId} from "../Repository/UserRoleMappingRespository";

type SurveyDTO = Tables["Survey"];
type SurveyInsert = Database["public"]["Tables"]["Survey"]["Insert"];
type ResponseDto = Tables["SurveyResponse"];

export async function CreateNewSurvey(surveyDto: SurveyDTO) {
    try {
            const survey: SurveyInsert = {
                title: surveyDto.title,
                survey_fields: surveyDto.survey_fields,
                created_by: surveyDto.created_by,
                closes_at: surveyDto.closes_at
            }
            const canCreateSurvey = await GetRowByuserId(survey.created_by!);
            console.log(canCreateSurvey);
            if(!canCreateSurvey.error){
                if(canCreateSurvey.result[0].can_create_survey) {
                    const result = await AddSurvey(survey);
                    return result;
                }
                else {
                    return {
                        status: 400,
                        statusText: "User is not allowed to create surveys",
                        data: null,
                    }
                }
            }
            return {
                status: 404,
                statusText: "No permission found for the user to create survey",
                data: null,
            }
    } catch(error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetAllSurveys(active: boolean){
    try{
        const result = await GetSurveys(active);
        return result;
    }catch(error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function CreateResponse(response: ResponseDto) {
    try {
        const surveyEnd = await GetSurveyById(response.survey_id, "closes_at");
        if(surveyEnd.result) {
            const currentTimeStamp = new Date().toISOString()
            const expirey = surveyEnd.result[0].closes_at;
            if(expirey>new Date(currentTimeStamp)) {
                const result = await AddUserResponse(response);
                return result;
            }
            else {
                return {
                    status: 406,
                    statusText: "Survey Not accepting any responses",
                    data: null,
                }
            }
        }
        return {
            status: 400,
            statusText: "ending time of survey not found",
            error: surveyEnd.error,
            data: null,
        }  
    }catch(error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetSurveyResponses(id: number) {
    try {
        const response = await GetSurveyResponse(id);
        return response;
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

export async function GetResponse(id: number) {
    try {
        const response = await GetResponseById(id);
        return response;
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

export async function GetSurvey(id: number) {
    try {
        const response = await GetSurveyById(id);
        return response;
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