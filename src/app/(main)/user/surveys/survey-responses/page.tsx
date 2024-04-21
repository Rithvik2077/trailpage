import React from 'react'
import { url_add_response,url_get_active_surveys, url_get_response_by_id } from "@/app/lib/apiEndPoints";

export default function SurveyResponsesPage() {
    const getResponseById = async (id: number) => {
        try {
          const url = `${url_get_response_by_id}${id}`;
          await fetch(url, {
            method: "GET",
          }).then(response => response.json())
          .then(result => console.log(result))
          .catch(err => console.log(err));
        } catch(error) {
          console.log("error while fetching:", error);
        }
      }
  return (
    <div>
      
    </div>
  )
}
