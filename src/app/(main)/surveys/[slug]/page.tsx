'use client'
import React, { useState } from 'react'
import {url_create_survey, url_get_survey_responses} from "@/app/lib/apiEndPoints";

export default function SurveyResponses({params}) {

  const [responseData, setResponseData] = useState();
  const [dataFetched, setDataFetched] = useState(false);

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
    setDataFetched(true)
  })
  


  return (
    <div>
      {/* {surveyResponse.map(()=>())} */}

      {dataFetched===false && <p>Fetching responses</p>}
      {dataFetched===true  && responseData.map((res)=>{
        {console.log(res.response_data)}
        <h1>Response</h1>
      })}
    </div>
  )
}
