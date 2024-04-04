import {Tables} from "@/types/Dto";
import { Database } from "@/types/database.types";

import {AddSurvey, GetSurveys, AddUserResponse} from "../Repository/SurveyRepository";

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
    const result = await AddSurvey(survey);
    return {
        status: result.status,
        statusText: result.statusText,
        data: result.data
    };
}

export async function GetAllSurveys(active: boolean){
    const data = await GetSurveys(active);
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data,
    }
}

export async function CreateResponse(response: ResponseDto) {
    const result = await AddUserResponse(response);
    return {
        status: result.status,
        statusText: result.statusText,
        data: result.data
    }
}