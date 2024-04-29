/* eslint-disable react/jsx-key */
"use client";
import React, { useState } from "react";
import { SurveyInput } from "@/components/repo2/survey-input-popover";
import { FieldTypes } from "@/components/enums/survey-field-types";
import { Button } from "@/components/repo2/ui/button";
import {url_create_survey, url_get_survey_responses} from "@/app/lib/apiEndPoints";
import { useRouter } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import {revalidateSurveyList} from '@/app/lib/revalidatefnx'

export interface FormFields {
  type: FieldTypes;
  label?: string;
  options?: string[];
  matrixRow?: string[];
  matrixColumn?: string[];
}




function SurveysCreation() {
  const router = useRouter();

  const [formFields, setFormFields] = useState<FormFields[]>([]);
  const [surveyTitle, setSurveyTitle] = useState<String>('Test-Survey');
  const [surveyDescription, setSurveyDescription] = useState<String>('Test-Description');
  const [closesAt, setClosesAt ] = useState<String>();


  const addSurvey = async () => {
    
    let currentDate = new Date();
    // Add one month to the current date
    let futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    // Create an ISO string for the future date
    let futureISOString = futureDate.toISOString();
    const body = {
      'title': surveyTitle,
      'survey_fields': formFields,
      'closes_at': futureISOString
    }
    try {
      await fetch(url_create_survey, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        // revalidateSurveyList();
        // router.push('/surveys/view-surveys');
      })
      .catch(err => console.log(err));
    }catch (error) {
      console.log("error while fetching:", error)
    }
  }
  // const router = useRouter();
  // const routeToUserResponses = () => {
  //   router.push("/user/surveys");
  // };

  return (
      <div className="bg-slate-300 min-h-screen">
        {/* <button onClick={()=>addField('label')}>Add Field Label</button>
      <button onClick={()=>addField('label')}>Add Dropdown</button>
      <button onClick={()=>addField('label')}>Add Checkbox</button>
      <button onClick={()=>addField('input')}>Add Text Input</button>
      <button onClick={()=>addField('fileUploader')}>Add Document Uploader</button> */}

        <div className="flex items-center justify-center gap-2 pt-5">
        <SurveyInput
          fieldType={FieldTypes.TEXTINPUT}
          formFields={formFields}
          setFormFields={setFormFields}
        >
          Add Text Input
        </SurveyInput>
        <SurveyInput
          fieldType={FieldTypes.DROPDOWN}
          formFields={formFields}
          setFormFields={setFormFields}
        >
          Add Dropdown Input
        </SurveyInput>
        <SurveyInput
          fieldType={FieldTypes.CHECKBOX}
          formFields={formFields}
          setFormFields={setFormFields}
        >
          Add Checkbox Input
        </SurveyInput>
        <SurveyInput
          fieldType={FieldTypes.FILEUPLOAD}
          formFields={formFields}
          setFormFields={setFormFields}
        >
          Add Document Uploader Input
        </SurveyInput>
        <SurveyInput
          fieldType={FieldTypes.DATE}
          formFields={formFields}
          setFormFields={setFormFields}
        >
          Add Date Picker
        </SurveyInput>
        <SurveyInput
          fieldType={FieldTypes.MATRIX}
          formFields={formFields}
          setFormFields={setFormFields}
        >
          Add Matrix Input
        </SurveyInput>
        </div>
        

        <form action="">
          <div className="mt-6 flex flex-col items-center justify-center gap-4 bg-slate-300 p-10 ">
            <div className="w-[55%] rounded-lg border-t-4 border-blue-500 bg-white p-3">
              <div className="text-2xl">
                <input
                  className="my-8 w-[100%] text-2xl outline-none"
                  placeholder="Survey Title"
                  onChange={(e)=>setSurveyTitle(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  className="w-[100%] outline-none"
                  placeholder="Survey Description"
                  onChange={(e)=>setSurveyDescription(e.target.value)}
                />
              </div>
              {/* <div className="text-2xl">
                <input
                  className="my-8 w-[100%] text-2xl outline-none"
                  placeholder="Closes At"
                  // onChange={(e)=>setClosesAt(e.target.value)}
                />
              </div> */}
            </div>
            {formFields?.map((item: FormFields) => (
              <div className="w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3">
                {item.type === FieldTypes.TEXTINPUT && (
                  <div className="flex flex-col ">
                    <label className="mb-3 text-lg">{item.label} </label>
                    <input placeholder="input" />
                  </div>
                )}

                {item.type == FieldTypes.DROPDOWN && (
                  <div className="flex flex-col ">
                    <label className="mb-3 text-lg">{item.label}</label>
                    <select className="w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none">
                      <option className="p-10">Choose your pick </option>
                      {item.options!.map((itemVal) => (
                        <option>
                          <div className="p-10">{itemVal}</div>
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {item.type == FieldTypes.CHECKBOX && (
                  <div className="flex flex-col ">
                    <label className="mb-3 text-lg">{item.label} </label>
                    <div className="flex flex-col ">
                      {item.options?.map((itemVal) => (
                        <div className="align-center flex gap-4">
                          <input type="checkbox" />
                          <label>{itemVal} </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {item.type == FieldTypes.FILEUPLOAD && (
                  <div className="flex flex-col ">
                  <label className="mb-3 text-lg">
                    {item.label}
                  </label>
                  <div className="flex justify-center items-center">
                    <input name='myfile' type="file" className="w-72 max-w-full p-1.5 bg-white text-gray-800 rounded-lg border border-gray-500 file:mr-5 file:border-none file:bg-blue-800 file:px-5 file:py-2 file:rounded-lg file:text-white file:cursor-pointer file:hover:bg-blue-600" />
                  </div>
                  
                </div>
                )}
                {item.type == FieldTypes.DATE && (
                  <div className="flex flex-col ">
                    <label className="mb-3 text-lg" htmlFor="">
                      {item.label}{" "}
                    </label>
                    {/* <input type="date" /> */}

                    <div className="relative max-w-sm">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <svg
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        type="date"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Select date"
                      />
                    </div>
                  </div>
                )}
                {item.type == FieldTypes.MATRIX && (<>
                  <label className="">{item.label} </label>
                  <div className="flex items-center justify-center">
                  <table className="w-[80%]">
                    <tr className="text-center">
                      <th> </th>
                      {item.matrixColumn?.map((col) => {
                        return <th>{col}</th>;
                      })}
                    </tr>

                      <tbody>
                    {item.matrixRow?.map((row) => {
                      return (
                        <tr>
                          <td>{row}</td>
                          {item.matrixColumn?.map(() => {
                            return (
                              // eslint-disable-next-line react/jsx-key
                              <td className="text-center">
                                <input type="radio" name={row} />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>
                    </div></>
                )}
              </div>
            ))}
          </div>

            <div className=" flex items-center justify-center">
            <button
            type="button"
            className="mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={()=>addSurvey()}
            >
                Create Survey
            </button>
            </div>
        </form>
      </div>
  );
}

export default SurveysCreation;
