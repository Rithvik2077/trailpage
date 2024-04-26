"use client"
import React, { useState } from "react";
import Surveys from "@/components/repo2/Survey/SurveyList";
import { url_add_response,url_get_active_surveys, url_get_response_by_id } from "@/app/lib/apiEndPoints";
import { get } from "http";
import Link from "next/link";
import SurveySystemTable from "@/components/repo2/dashboard/DashboardDataComponent/SurveyData/SurveyData";
import { formatDateString } from "@/../public/data/Components/function";
import {url_create_survey, url_get_survey_responses} from "@/app/lib/apiEndPoints";




function SurveyResponses({params}) {

    const surveyID =  params['survey-responses'];

    const [surveyResponses, setSurveyResponse] = useState([]);
    const [surveyTitle, setSurveyTitle] = useState('')
    const [dataFetched, setDataFetched] = useState(false);

    const viewSurveyResponse = async (id: number) => {
      try {
        const url = `${url_get_survey_responses}${id}`;
        return fetch(url, {
          method: "GET",
        }).then((response) => response.json())
          .then((res) => { return res;})
          .catch((err) => console.log(err));
      } catch (error) {
        console.log("error while fetching:", error);
      }
    };
  
    viewSurveyResponse(params['survey-responses']).then((surveyResponse)=>{
      console.log('raw survey response:>',surveyResponse);
      console.log('tghdchsbsds is survey response',surveyResponse.Response.result);
      setSurveyResponse(surveyResponse.Response.result);
      checkFetchingOfData()
    })

    const checkFetchingOfData = ()=>{
      if(surveyResponses && surveyResponses.length>0){
        console.log('this is res', surveyResponses)
        setDataFetched(true)  
      }
    }
  

return (
    <div>
     {dataFetched==true && <div className="mb-8 mt-12 flex flex-col gap-12 ">
      <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-8 rounded-xl bg-gradient-to-tr from-blue-900 to-blue-800 bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20">
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased">
            Survey Responses
          </h6>
        </div>
        <div className=" p-6 px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead className=" text-base text-sky-900">
              <tr>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-left">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Survey Title
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Response By
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Response Date
                  </p>
                </th>
                {/* <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Total Responses
                  </p>
                </th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {surveyResponses.map((response, index) => (
                <tr key={index}>
                  <td className="border-blue-gray-50 border-b px-5 py-3 text-left">
                    <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                      {/* {survey.survey_title} */}
                      Survey Title
                    </p>
                  </td>
                  <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                    <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                      {response.username}
                    </p>
                  </td>
                  <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                    <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                      {formatDateString(response.createdat)}
                    </p>
                  </td>
                  <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                    <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                      <Link href={`${surveyID}/${response.id}`}>
                      <button>
                      View Response
                      </button>
                      </Link>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>}
    </div>
  );

        
      
      

}

export default SurveyResponses;