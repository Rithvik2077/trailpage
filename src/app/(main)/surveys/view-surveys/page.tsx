"use client"
import React, { useState } from "react";
import Surveys from "@/components/repo2/Survey/SurveyList";
import { url_add_response,url_get_active_surveys, url_get_response_by_id } from "@/app/lib/apiEndPoints";
import { get } from "http";
import Link from "next/link";

// const surveyData = [
//   {
//     ID: "1",
//     Title: "Employee Satisfaction Survey",
//     Description:
//       "Gather feedback from employees about their satisfaction with the company culture, management, and work environment.",
//     CreatedBy: "John Doe",
//     CreatedAt: "2024-04-03T08:00:00Z",
//   },
//   {
//     ID: "2",
//     Title: "Product Feedback Survey",
//     Description:
//       "Collect opinions from customers about the usability, features, and overall satisfaction with our product.",
//     CreatedBy: "Jane Smith",
//     CreatedAt: "2024-04-02T10:30:00Z",
//   },
//   {
//     ID: "3",
//     Title: "Training Program Evaluation",
//     Description:
//       "Assess the effectiveness of our training programs by gathering feedback from participants.",
//     CreatedBy: "Michael Johnson",
//     CreatedAt: "2024-03-31T15:45:00Z",
//   },
//   {
//     ID: "4",
//     Title: "Customer Service Satisfaction Survey",
//     Description:
//       "Evaluate customers' satisfaction with our customer service interactions and support.",
//     CreatedBy: "Emily Brown",
//     CreatedAt: "2024-03-30T11:20:00Z",
//   },
//   {
//     ID: "5",
//     Title: "Marketing Campaign Feedback",
//     Description:
//       "Get insights into the effectiveness of our latest marketing campaigns and strategies.",
//     CreatedBy: "David Wilson",
//     CreatedAt: "2024-03-29T09:15:00Z",
//   },
//   {
//     ID: "6",
//     Title: "Website User Experience Survey",
//     Description:
//       "Collect feedback from website visitors to improve user experience and navigation.",
//     CreatedBy: "Sarah Lee",
//     CreatedAt: "2024-03-28T14:00:00Z",
//   },
//   {
//     ID: "7",
//     Title: "Employee Training Needs Assessment",
//     Description:
//       "Identify areas where employees require additional training and development.",
//     CreatedBy: "Chris Taylor",
//     CreatedAt: "2024-03-27T13:30:00Z",
//   },
//   {
//     ID: "8",
//     Title: "Customer Demographic Survey",
//     Description:
//       "Gather demographic information about our customer base for targeted marketing.",
//     CreatedBy: "Alexandra Martinez",
//     CreatedAt: "2024-03-26T16:45:00Z",
//   },
//   {
//     ID: "9",
//     Title: "Employee Wellness Check",
//     Description:
//       "Assess employees' physical and mental well-being to implement wellness initiatives.",
//     CreatedBy: "Daniel Garcia",
//     CreatedAt: "2024-03-25T10:00:00Z",
//   },
//   {
//     ID: "10",
//     Title: "Event Satisfaction Survey",
//     Description:
//       "Collect feedback from attendees to improve future events and conferences.",
//     CreatedBy: "Sophia Adams",
//     CreatedAt: "2024-03-24T12:15:00Z",
//   },
//   {
//     ID: "11",
//     Title: "Product Usage Feedback",
//     Description:
//       "Understand how customers are using our product and areas for improvement.",
//     CreatedBy: "William Roberts",
//     CreatedAt: "2024-03-23T14:30:00Z",
//   },
//   {
//     ID: "12",
//     Title: "Training Workshop Evaluation",
//     Description:
//       "Evaluate the effectiveness of training workshops conducted for employees.",
//     CreatedBy: "Olivia Johnson",
//     CreatedAt: "2024-03-22T09:45:00Z",
//   },
//   {
//     ID: "13",
//     Title: "Market Research Survey",
//     Description:
//       "Gather insights into market trends, consumer behavior, and competitor analysis.",
//     CreatedBy: "Matthew Thompson",
//     CreatedAt: "2024-03-21T11:00:00Z",
//   },
//   {
//     ID: "14",
//     Title: "New Product Idea Evaluation",
//     Description:
//       "Collect feedback on new product ideas to prioritize development efforts.",
//     CreatedBy: "Ella Harris",
//     CreatedAt: "2024-03-20T14:20:00Z",
//   },
//   {
//     ID: "15",
//     Title: "Employee Performance Review",
//     Description:
//       "Assess employees' performance and provide constructive feedback for improvement.",
//     CreatedBy: "Lucas Anderson",
//     CreatedAt: "2024-03-19T15:30:00Z",
//   },
//   {
//     ID: "16",
//     Title: "Customer Satisfaction Index Survey",
//     Description:
//       "Measure overall customer satisfaction and identify areas for enhancement.",
//     CreatedBy: "Ava Wilson",
//     CreatedAt: "2024-03-18T10:40:00Z",
//   },
//   {
//     ID: "17",
//     Title: "Social Media Engagement Survey",
//     Description:
//       "Analyze engagement levels and preferences of our social media audience.",
//     CreatedBy: "Noah Martin",
//     CreatedAt: "2024-03-17T08:55:00Z",
//   },
//   {
//     ID: "18",
//     Title: "Supplier Performance Evaluation",
//     Description:
//       "Assess the performance of suppliers to ensure quality and efficiency.",
//     CreatedBy: "Isabella Lee",
//     CreatedAt: "2024-03-16T16:00:00Z",
//   },
//   {
//     ID: "19",
//     Title: "Website Content Feedback",
//     Description:
//       "Gather feedback on website content to improve relevance and clarity.",
//     CreatedBy: "Liam Brown",
//     CreatedAt: "2024-03-15T12:10:00Z",
//   },
//   {
//     ID: "20",
//     Title: "Employee Onboarding Survey",
//     Description:
//       "Evaluate the effectiveness of the onboarding process for new hires.",
//     CreatedBy: "Emma Taylor",
//     CreatedAt: "2024-03-14T11:20:00Z",
//   },
//   // Add more surveys here with similar structure
// ];





const getAllSurveys = async () => {
    try {
      return await fetch(url_get_active_surveys, {
        method: "GET",
      })
      .then(response => response.json())
      .then(result => {console.log(result, 'This is inside the get all survey fnx****'); return result})
      .catch(err => console.log(err));
    } catch(error) {
      console.log("error while fetching:", error);
    }
  }





function SurveyList() {

    const [surveyData, setSurveyData] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    const checkSurveyData =()=>{
        if(surveyData){setDataFetched(true);}
    }

    getAllSurveys().then((data)=>{
        console.log(data.Response.result, 'this the the survey data')
        setSurveyData(data.Response.result)
        checkSurveyData();
    });

    // console.log('surveyList******** ',surveyData.surveyData);
    // const arraySurvey = surveyData.surveyData;
  
  // const surveyData = getSurveys();

return (
    <div>
      <div className="flex items-stretch justify-center">
        {/* <div className="w-[22%] bg-slate-100 items-stretch h-screen">
            <div className="mx-2 my-1 mt-2 text-xl">Filters</div>
            <div
              className={`${
                filterApplied == "Solved"
                  ? "border-sky-500 text-sky-500"
                  : "border-gray-300 text-gray-400"
              } border-2  py-2 px-4 rounded-lg inline-block cursor-pointer m-2`}
              // onClick={() => statusFilter("Solved")}
            >
              Solved
            </div>
            <div
              className={`${
                filterApplied == "In Progress"
                  ? "border-sky-500 text-sky-500"
                  : "border-gray-300 text-gray-400"
              } border-2  py-2 px-4 rounded-lg inline-block cursor-pointer `}
              // onClick={() => statusFilter("In Progress")}
            >
              In Progress
            </div>
          </div> */}

        <div className="w-[90%]">
          {/* <div className="py-6 px-2">
              <TicketGeneratorButton />
            </div> */}

          <div className=" p-8">
            {dataFetched==false && <h1>Fetching Data...</h1>} 
          {dataFetched==true && surveyData && surveyData.map((survey)=>(
              <div
                key={survey.ID}
                className="m-5 flex items-center justify-around rounded-full border-b  border-sky-500 bg-slate-50 px-6 py-4"
              >
                <div>{survey.title}</div>
                <div>Description</div>
                <div>{survey.createdby}</div>

                <div>{survey.createdat}</div>
                <Link
                  href={{ pathname: `./${survey.id}` }}
                  className="cursor-pointer text-sm "
                >
                  <button
                    type="button"
                    className="mb-2 me-2 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    View Responses
                  </button>
                </Link>
              </div>
            ))}
            {/* {surveyData.map((survey: any) => (
              <div
                key={survey.ID}
                className="m-5 flex items-center justify-around rounded-full border-b  border-sky-500 bg-slate-50 px-6 py-4"
              >
                <div>{survey.Title}</div>
                <div>{survey.Description}</div>
                <div>{survey.CreatedBy}</div>

                <div>{survey.CreatedAt}</div>
                <Link
                  href={{ pathname: `./surveys/${survey.ID}`, query: survey }}
                  className="cursor-pointer text-sm "
                >
                  <button
                    type="button"
                    className="mb-2 me-2 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    Fill Survey
                  </button>
                </Link>
              </div>
            ))} */}
          </div>

          
        </div>
      </div>
    </div>
  );

        
      
      {/* <button onClick={getAllSurveys}>
        Get All Surveys
      </button> */}
      {/* <button onClick={() => getResponseById(1)}>
        Get response by id
      </button> */}
      {/* <Surveys surveyData={surveyData} /> */}

}

export default SurveyList;
