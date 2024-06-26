'use state'
import React, { useState } from 'react'
import {url_create_survey, url_get_survey_responses} from "@/app/lib/apiEndPoints";
import { SurveyInput } from "@/components/repo2/survey-input-popover";
import { FieldTypes } from "@/components/enums/survey-field-types";
import {FormFields} from '@/app/(main)/surveys/SurveyMain'

export default function SurveyForm({responseData}) {
  console.log("yeyeeyee", responseData);
  let i = 0;
  return (
    <>
    hello
       {responseData.map((response)=>{
        <div><h3>Response From {response.id}</h3>
        <h3>Survey id: {response.username}</h3></div>
       })}
    </>
  )
}

// {responseData.map((item: FormFields) => (
        
//   <div className="w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3" key={i}>
//   {item.type === FieldTypes.TEXTINPUT && (
//     <div className="flex flex-col ">
//       <label className="mb-3 text-lg">{item.label} </label>
//       <input name='input-tag' placeholder="input" />
//     </div>
//   )}

//   {item.type == FieldTypes.DROPDOWN && (
//     <div className="flex flex-col ">
//       <label className="mb-3 text-lg">{item.label}</label>
//       <select className="w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none">
//         <option className="p-10">Choose your pick </option>
//         {item.options!.map((itemVal) => (
//           <option key={i+1}>
//             <div className="p-10" >{itemVal}</div>
//           </option>
//         ))}
//       </select>
//     </div>
//   )}
//   {item.type == FieldTypes.CHECKBOX && (
//     <div className="flex flex-col ">
//       <label className="mb-3 text-lg">{item.label} </label>
//       <div className="flex flex-col ">
//         {item.options?.map((itemVal) => (
//           <div className="align-center flex gap-4" key={i+1}>
//             <input name='input-tag' type="checkbox" />
//             <label>{itemVal} </label>
//           </div>
//         ))}
//       </div>
//     </div>
//   )}
//   {item.type == FieldTypes.FILEUPLOAD && (
//     <div className="flex flex-col ">
//       <label className="mb-3 text-lg" htmlFor="">
//         {item.label}{" "}
//       </label>
//       {/* <input
//         className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//         type="file"
//       /> */}
//       <div className="flex w-full items-center justify-center">
//         <label
//           htmlFor="dropzone-file"
//           className="h-34 dark:hover:bg-bray-800 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//         >
//           <div className="flex flex-col items-center justify-center pb-6 pt-5">
//             <svg
//               className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 16"
//             >
//               <path
//                 stroke="currentColor"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//               />
//             </svg>
//             <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
//               <span className="font-semibold">
//                 Click to upload
//               </span>{" "}
//               or drag and drop
//             </p>
//             <p className="text-xs text-gray-500 dark:text-gray-400">
//               SVG, PNG, JPG or GIF (MAX. 800x400px)
//             </p>
//           </div>
//           <input name='input-tag'
//             id="dropzone-file"
//             type="file"
//             className="hidden"
//           />
//         </label>
//       </div>
//     </div>
//   )}
//   {item.type == FieldTypes.DATE && (
//     <div className="flex flex-col ">
//       <label className="mb-3 text-lg" htmlFor="">
//         {item.label}{" "}
//       </label>
//       {/* <input type="date" /> */}

//       <div className="relative max-w-sm">
//         <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
//           <svg
//             className="h-4 w-4 text-gray-500 dark:text-gray-400"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
//           </svg>
//         </div>
//         <input name='input-tag'
//           type="date"
//           className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//           placeholder="Select date"
//         />
//       </div>
//     </div>
//   )}
//   {item.type == FieldTypes.MATRIX && (
//     <div>
//       <label htmlFor="">{item.label} </label>
//       <ul className="flex">
//         <li>Empty </li>
//         {item.matrixColumn?.map((col) => {
//           return <li key={i+1}>{col}</li>;
//         })}
//       </ul>

//       {item.matrixRow?.map((row) => {
//         return (
//           <ul className="flex" key={i+1}>
//             <li>{row}</li>
//             {item.matrixColumn?.map(() => {
//               return (
//                 // eslint-disable-next-line react/jsx-key
//                 <li>
//                   <input type="radio" name={row} />
//                 </li>
//               );
//             })}
//           </ul>
//         );
//       })}
//     </div>
//   )}
// </div>
//  ))}
