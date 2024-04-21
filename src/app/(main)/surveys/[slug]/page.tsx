'use client'
import React, { useState } from 'react'
import {url_create_survey, url_get_survey_responses} from "@/app/lib/apiEndPoints";

export default function SurveyResponses({params}) {

  const [responseData, setResponseData] = useState();

  const viewSurveyResponse = async (id: number) => {
    try {
      const url = `${url_get_survey_responses}${id}`;
      return await fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((res) => {console.log(res); return res;})
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("error while fetching:", error);
    }
  };

  viewSurveyResponse(params.slug).then((surveyResponse)=>{
    console.log('tghdchsbsds is survey response',surveyResponse.Response.result);
    setResponseData(surveyResponse.Response.result);
  })
  


  return (
    <div>
      {/* {surveyResponse.map(()=>())} */}

      {responseData==undefined && <p>Fetching responses</p>}
      {responseData!=undefined && <>Hello</> && responseData.map((res)=>{
        {console.log(res.response_data)}
        <h1>Response</h1>
      })}
    </div>
  )
}
