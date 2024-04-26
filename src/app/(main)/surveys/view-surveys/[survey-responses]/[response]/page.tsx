'use client'
import React, { useState } from 'react'
import SurveyResponse from '../../../[slug]/surveyResponse';

export default function SurveySingleResponsePage({params}) {

    const responseID = params['response'];
    const [responseFields, setResponseFields] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    const getResponseDataByID = async() => {
        return fetch(`/api/survey/admin/getresponsebyid?id=${responseID}`)
        .then(res => res.json())
        .then(result => result)
    }

    getResponseDataByID().then((data)=>{
        console.log(data.Response.result[0]);
        setResponseFields(data.Response.result[0]);
        checkResponseFields()
    })

    const checkResponseFields = ()=>{
        if(responseFields){
            setDataFetched(true);
        }
    }

  return (
    <div>
        {dataFetched==false && <h3>fetching response</h3>}
        {dataFetched==true && <SurveyResponse response={responseFields['response_data']}/>}
    </div>
  )
}
