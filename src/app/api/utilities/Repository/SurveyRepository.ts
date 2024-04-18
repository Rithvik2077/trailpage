import {supabase} from "../Data/DbConnect";
import { Database } from "@/types/database.types";
import { db } from "../Data/RenderConnect";

type SurveyInsert = Database["public"]["Tables"]["Survey"]["Insert"];
type SurveyResponseInsert = Database["public"]["Tables"]["SurveyResponses"]["Insert"];

const SurveyTable = "Survey";
const ResponseTable = "SurveyResponses";
// survey: {
//     closes_at?: string;
//     created_at?: string;
//     created_by?: number;
//     id?: number;
//     survey_fields?: Json;
//     title?: string;
// }
export async function AddSurvey(survey: SurveyInsert){
    const client = await db.connect();
    try{
        const surveyFieldsJSON = JSON.stringify(survey.survey_fields);
         const query = {
            text: "insert into surveys (title, surveyfields, createdby, createdat, closes_at) values ($1, $2, $3, $4, $5)",
            values: [survey.title, surveyFieldsJSON, survey.created_by, survey.created_at, survey.closes_at]
         }
         const result = await client.query(query);
         client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result
        };
    }catch(error) {
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetSurveys(active: boolean) {
    const client = await db.connect();
    let query_text = "SELECT * from surveys";
    const params = [];
    if(active){
        const currentTimeStamp = new Date().toISOString();
        query_text += " where closes_at > $1";
        params.push(currentTimeStamp);
    }

    query_text += ";";

    try{
        const result = await client.query(query_text, params);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows,
        };
    }catch(error) {
        client.end()
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}
// response: {
//     created_at?: string;
//     id?: number;
//     response_data?: Json;
//     survey_id?: number;
//     user_id?: number;
// }
export async function AddUserResponse(response: SurveyResponseInsert) {
    const client = await db.connect();
    const responseFieldsJSON = JSON.stringify(response.response_data);
    const query = {
        text: "insert into surveyresponses (user_id, survey_id, response_data) values ($1, $2, $3)",
        values: [response.user_id, response.survey_id, responseFieldsJSON]
    }
    try{
        const result = await client.query(query);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result,
        };
    } catch(error) {
        console.log(error);
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetSurveyById(id: number, filter?: string) {
    const client = await db.connect();
    try{
        let query_text = 'select * from surveys where id = $1';
        let params = [id];

        if(filter) {
            query_text = `select ${filter} from surveys where id = $1`;
        }
        const result = await client.query(query_text, params);
        console.log(result);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows,
        };
    }catch(error) {
        console.log("getsurveybyid repo", error);
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetSurveyResponse(id: number) {
    const client = await db.connect();
    try {
        const query = {
            text: `select sr.id, u.username, sr.response_data, sr.createdat from surveyresponses sr join users u on u.id = sr.user_id where sr.survey_id = $1;`,
            values: [id],
        }
        const result = await client.query(query);
        // console.log(result);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows,
        };
    }catch (error){
        console.log(error);
        client.end()
        return {
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            error: error,
            data: null,
        }
    }
}

export async function GetResponseById(id: number) {
    const client = await db.connect();
    try {
        const query = {
            text: "select * from surveyresponses where id = $1",
            values: [id],
        }
        const result = await client.query(query);
        client.end()
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows,
        };
    }catch (error){
        console.log(error);
        client.end();
        return {
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            error: error,
            data: null,
        }
    }
}