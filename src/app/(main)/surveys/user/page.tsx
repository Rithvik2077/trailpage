import React from "react";
import Surveys from "@/components/repo2/Survey/SurveyList";
import { getActiveSurveys } from "src/app/lib/surveyFunctions";

const surveyData = [
  {
    ID: "1",
    Title: "Employee Satisfaction Survey",
    Description:
      "Gather feedback from employees about their satisfaction with the company culture, management, and work environment.",
    CreatedBy: "John Doe",
    CreatedAt: "2024-04-03T08:00:00Z",
  },
  {
    ID: "2",
    Title: "Product Feedback Survey",
    Description:
      "Collect opinions from customers about the usability, features, and overall satisfaction with our product.",
    CreatedBy: "Jane Smith",
    CreatedAt: "2024-04-02T10:30:00Z",
  },
  {
    ID: "3",
    Title: "Training Program Evaluation",
    Description:
      "Assess the effectiveness of our training programs by gathering feedback from participants.",
    CreatedBy: "Michael Johnson",
    CreatedAt: "2024-03-31T15:45:00Z",
  },
  {
    ID: "4",
    Title: "Customer Service Satisfaction Survey",
    Description:
      "Evaluate customers' satisfaction with our customer service interactions and support.",
    CreatedBy: "Emily Brown",
    CreatedAt: "2024-03-30T11:20:00Z",
  },
  {
    ID: "5",
    Title: "Marketing Campaign Feedback",
    Description:
      "Get insights into the effectiveness of our latest marketing campaigns and strategies.",
    CreatedBy: "David Wilson",
    CreatedAt: "2024-03-29T09:15:00Z",
  },
  {
    ID: "6",
    Title: "Website User Experience Survey",
    Description:
      "Collect feedback from website visitors to improve user experience and navigation.",
    CreatedBy: "Sarah Lee",
    CreatedAt: "2024-03-28T14:00:00Z",
  },
  {
    ID: "7",
    Title: "Employee Training Needs Assessment",
    Description:
      "Identify areas where employees require additional training and development.",
    CreatedBy: "Chris Taylor",
    CreatedAt: "2024-03-27T13:30:00Z",
  },
  {
    ID: "8",
    Title: "Customer Demographic Survey",
    Description:
      "Gather demographic information about our customer base for targeted marketing.",
    CreatedBy: "Alexandra Martinez",
    CreatedAt: "2024-03-26T16:45:00Z",
  },
  {
    ID: "9",
    Title: "Employee Wellness Check",
    Description:
      "Assess employees' physical and mental well-being to implement wellness initiatives.",
    CreatedBy: "Daniel Garcia",
    CreatedAt: "2024-03-25T10:00:00Z",
  },
  {
    ID: "10",
    Title: "Event Satisfaction Survey",
    Description:
      "Collect feedback from attendees to improve future events and conferences.",
    CreatedBy: "Sophia Adams",
    CreatedAt: "2024-03-24T12:15:00Z",
  },
  {
    ID: "11",
    Title: "Product Usage Feedback",
    Description:
      "Understand how customers are using our product and areas for improvement.",
    CreatedBy: "William Roberts",
    CreatedAt: "2024-03-23T14:30:00Z",
  },
  {
    ID: "12",
    Title: "Training Workshop Evaluation",
    Description:
      "Evaluate the effectiveness of training workshops conducted for employees.",
    CreatedBy: "Olivia Johnson",
    CreatedAt: "2024-03-22T09:45:00Z",
  },
  {
    ID: "13",
    Title: "Market Research Survey",
    Description:
      "Gather insights into market trends, consumer behavior, and competitor analysis.",
    CreatedBy: "Matthew Thompson",
    CreatedAt: "2024-03-21T11:00:00Z",
  },
  {
    ID: "14",
    Title: "New Product Idea Evaluation",
    Description:
      "Collect feedback on new product ideas to prioritize development efforts.",
    CreatedBy: "Ella Harris",
    CreatedAt: "2024-03-20T14:20:00Z",
  },
  {
    ID: "15",
    Title: "Employee Performance Review",
    Description:
      "Assess employees' performance and provide constructive feedback for improvement.",
    CreatedBy: "Lucas Anderson",
    CreatedAt: "2024-03-19T15:30:00Z",
  },
  {
    ID: "16",
    Title: "Customer Satisfaction Index Survey",
    Description:
      "Measure overall customer satisfaction and identify areas for enhancement.",
    CreatedBy: "Ava Wilson",
    CreatedAt: "2024-03-18T10:40:00Z",
  },
  {
    ID: "17",
    Title: "Social Media Engagement Survey",
    Description:
      "Analyze engagement levels and preferences of our social media audience.",
    CreatedBy: "Noah Martin",
    CreatedAt: "2024-03-17T08:55:00Z",
  },
  {
    ID: "18",
    Title: "Supplier Performance Evaluation",
    Description:
      "Assess the performance of suppliers to ensure quality and efficiency.",
    CreatedBy: "Isabella Lee",
    CreatedAt: "2024-03-16T16:00:00Z",
  },
  {
    ID: "19",
    Title: "Website Content Feedback",
    Description:
      "Gather feedback on website content to improve relevance and clarity.",
    CreatedBy: "Liam Brown",
    CreatedAt: "2024-03-15T12:10:00Z",
  },
  {
    ID: "20",
    Title: "Employee Onboarding Survey",
    Description:
      "Evaluate the effectiveness of the onboarding process for new hires.",
    CreatedBy: "Emma Taylor",
    CreatedAt: "2024-03-14T11:20:00Z",
  },
  // Add more surveys here with similar structure
];

async function UserSurvey() {
  // const surveyData = getSurveys();

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsIm5hbWUiOiJIb21lbmljayIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzEzMTYxMTcwLCJleHAiOjE3MTM3NjU5NzB9.NwgONpWzqZi9r1eL_8JfcCa12m_93J25K3GHp_E8jD8";
  const surveys = await getActiveSurveys(token);
  console.log(surveys);

  // console.log(surveys.data.length);

  return (
    <div className="flex items-center justify-center">
      <Surveys surveyData={surveyData} />
    </div>
  );
}

export default UserSurvey;
