'use client'
import React, { useState } from 'react'
import {url_create_survey, url_get_survey_responses} from "@/app/lib/apiEndPoints";
import { SurveyInput } from "@/components/repo2/survey-input-popover";
import { FieldTypes } from "@/components/enums/survey-field-types";
import {FormFields} from '@/app/(main)/surveys/SurveyMain'
import SurveyForm from '@/app/(main)/surveys/[slug]/surveyForm'

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
        .then((res) => { return res;})
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
      
      {dataFetched===false && <p>Fetching responses</p>}
      {dataFetched===true  && <SurveyForm/>}
      
    </div>
  )
}
