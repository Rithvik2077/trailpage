import {Tables} from "@/types/Dto";
import { Database } from "@/types/database.types";

import {AddSurvey, GetSurveys, AddUserResponse, GetSurveyById, GetResponse} from "../Repository/SurveyRepository";
import {GetRowByuserId} from "../Repository/UserRoleMappingRespository";
import { Stats } from "fs";

type SurveyDTO = Tables["Survey"];
type SurveyInsert = Database["public"]["Tables"]["Survey"]["Insert"];
type ResponseDto = Tables["SurveyResponse"];

export async function CreateNewSurvey(surveyDto: SurveyDTO) {
    const survey: SurveyInsert = {
        title: surveyDto.title,
        survey_fields: surveyDto.survey_fields,
        created_by: surveyDto.created_by,
        closes_at: surveyDto.closes_at
    }
    const canCreateSurvey = await GetRowByuserId(survey.created_by!);
    if(canCreateSurvey.data){
        if(canCreateSurvey.data[0].can_create_survey) {
            const result = await AddSurvey(survey);
            return {
                status: result.status,
                statusText: result.statusText,
                data: result.data
            };
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
        error: canCreateSurvey.error,
    }
    
}

export async function GetAllSurveys(active: boolean){
    const data = await GetSurveys(active);
    if(data.data) {
        return {
            status: data.status,
            statusText: data.statusText,
            data: data.data,
        }
    }
    return {
        status: data.status,
        statusText: data.statusText,
        error: data.error,
        data: null,
    } 
}

export async function CreateResponse(response: ResponseDto) {
    const surveyEnd = await GetSurveyById(response.survey_id, "closes_at");
    const currentTimeStamp = new Date().toISOString();
    if(surveyEnd.data) {
        console.log(surveyEnd);
        if(surveyEnd.data[0].closes_at>currentTimeStamp) {
            const result = await AddUserResponse(response);
            return {
                status: result.status,
                statusText: result.statusText,
                data: result.data
            }
        }
        else {
            return {
                status: 406,
                statusText: "Not accepting any responses",
                data: null,
            }
        }
    }
    return {
        status: surveyEnd.status,
        statusText: surveyEnd.statusText,
        error: surveyEnd.error,
        data: null,
    }  
}

export async function GetSurveyResponses(id: number) {
    const surveys = await GetResponse(id);
    
    if(surveys.data) {
        return {
            status: surveys.status,
            statusText: surveys.statusText,
            data: surveys.data,
        }
    }
    return {
        status: surveys.status,
        statusText: surveys.statusText,
        error: surveys.error,
        data: null,
    } 
}