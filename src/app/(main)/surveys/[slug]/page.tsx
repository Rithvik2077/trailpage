'use client'
import React, { useState } from 'react'
import {url_create_survey, url_get_survey_responses} from "@/app/lib/apiEndPoints";
import { SurveyInput } from "@/components/repo2/survey-input-popover";
import { FieldTypes } from "@/components/enums/survey-field-types";
import {FormFields} from '@/app/(main)/surveys/SurveyMain'
import SurveyForm from '@/app/(main)/surveys/[slug]/surveyForm'
import SurveyResponse from './surveyResponse'

export default function SurveyResponses({params}) {

  const [responseData, setResponseData] = useState([]);
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
    console.log('raw survey response:>',surveyResponse);
    console.log('tghdchsbsds is survey response',surveyResponse.Response.result);
    setResponseData(surveyResponse.Response.result);
    checkFetchingOfData()
    console.log('this is response data',responseData)
  })

  const checkFetchingOfData = ()=>{
    if(responseData && responseData.length>0){
      console.log('this is res', responseData)
      setDataFetched(true)
      
    }
  }
  
  return (
    <div><>{responseData.forEach((response)=>{
          <div><h3>Response From {response.id}</h3>
          <h3>iughiuj</h3>
          <h3>Survey id: {response.username}</h3></div>
         })}</>
      
      {dataFetched===false && <p>Fetching responses</p>}
      {dataFetched===true  && <>this is data {responseData.map((res)=>(
        <>
        <h3>Submitted by: {res.username} </h3> 
        <h3>Created At: {res.createdat} </h3>
        <div>
        <SurveyResponse response={res.response_data}/>
        </div>
        </>
      ))}</>}
      
    </div>
  )
}