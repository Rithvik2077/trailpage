"use client";

import SurveysCreation from "@/app/(main)/surveys/SurveyMain";
import React, { useState } from "react";
import { createSurvey } from "@/app/lib/surveyFunctions";
import SurveyResponses from "./responses/page";
import { verifyJwt } from "@/app/lib/jwt";
import {url_create_survey, url_get_survey_responses} from "@/app/lib/apiEndPoints";

export default function MAINSurvey() {

  const [pageChoice, setPageChoice] = useState(1);

  const surveyData = {
    title: "employee satisfaction",
    survey_fields: [{"question":"Are you satisfied with your current role and responsibilities?","options":["Yes","No"]},{"question":"How would you rate the overall work culture and environment?","options":["Excellent","Good","Average","Poor"]},{"question":"Do you feel valued and recognized for your contributions?","options":["Yes","No"]}],
    closes_at: "2024-05-31 10:45:00",
  };

  const addSurvey = async () => {
    try {
      await fetch(url_create_survey, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(err => console.log(err));
    }catch (error) {
      console.log("error while fetching:", error)
    }
  }

  const viewSurveyResponse = async (id: number) => {
    try {
      const url = `${url_get_survey_responses}${id}`;
      await fetch(url, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
    } catch(error) {
      console.log("error while fetching:", error);
    }
  }

  function handleSubmit() {
    // let token = document.cookie.match("Authorize").input;
    // const tokens = token.split("=");

    // console.log(token);

    // createSurvey(
    //   "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsIm5hbWUiOiJIb21lbmljayIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzEzMTYxMTcwLCJleHAiOjE3MTM3NjU5NzB9.NwgONpWzqZi9r1eL_8JfcCa12m_93J25K3GHp_E8jD8",
    //   data as any,
    // );
  }

  return (
    <div className="bg-selago-100 flex flex-col items-center justify-center">
      <>
      <button onClick={()=>setPageChoice(2)}>View Responses</button>
      <button onClick={()=>setPageChoice(1)}>Create Survey</button>
      </>
      
      {pageChoice==1 && <>
      <SurveysCreation />
      <button
        type="button"
        className="mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        onClick={handleSubmit}
      >
        Create Survey
      </button>
  
      </>}
      {pageChoice==2 && <>
      <SurveyResponses/>
      </>}
    </div>
  );
}
