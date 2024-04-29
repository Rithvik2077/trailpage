'use client'
import React, { useState } from 'react'
import { url_add_response, url_get_survey_by_id } from "@/app/lib/apiEndPoints";
import SurveyForm from '@/app/(main)/surveys/[slug]/surveyForm';
import { FieldTypes } from "@/components/enums/survey-field-types";
import {FormFields} from '@/app/(main)/surveys/SurveyMain'
import LoaderComponent from 'public/data/Loader/load';


export default function FillSurveyPage({params}) {
   let itemID = 1;
   let matrixKey=0;
    const surveyID = params.slug;

    const [dataFetched,setDataFetched] = useState(false);
    const [surveyFields,setSurveyFields] = useState([]);
    const [title, setTitle] = useState('');

    // const dummyResponse = {
    //     survey_id: 1,
    //     response_data: [{"question":"How would you rate the overall organization of the event?","response":"Good"},{"question":"Did you find the event content relevant and engaging?","response":"Yes"},{"question":"Would you recommend this event to others?","response":"Maybe"}]
    //   }
      const submitResponse = async (responseData) => {
        console.log("sending with response data: ",responseData);
        try {
          await fetch(url_add_response, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(responseData),
          })
          .then(response => response.json())
          .then(result =>  console.log('this was reached',result))
          .catch(err => console.log(err));
        } catch(error) {
          console.log("error while fetching:", error);
        }
      }

      const GetSurveyById = async (surveyID) => {
        try {
          return await fetch(`${url_get_survey_by_id}${surveyID}`)
          .then(response => response.json())
          .then(result => {console.log(result); return result})
          .catch(err => console.log(err))
        } catch(error) {
          console.log("error while fetching:", error);
        }
      }

      

      GetSurveyById(surveyID).then((res)=>{
        
        // console.log(res.Response.result[0]);
        setTitle(res.Response.result[0].title);
        setSurveyFields(res.Response.result[0].surveyfields);
        checkDataFetched();
        
      })

      const checkDataFetched = ()=>{
        if(surveyFields){
          setDataFetched(true)
        }
      }

      // const handleResponse = (event)=>{

      //   event.preventDefault();
        
      //   const form = event.target;
      //   // console.log('This is raw form event.target', form);

      //   // Create a FormData object from the form
      //   const formData = new FormData(form);

      //   // console.log('This is formdata.values ', formData.values)

      //   formData.forEach((value,record) => {
      //     console.log(record);
      //     console.log(value)
      // });
    
      //   // Access the input values from the FormData object
      //   // You can use the `get` method with the name attribute of each input element
      //   const inputText = formData.get('hello');
      //   console.log('this is data********',formData)

      //   const survey_id = params.slug;
      //   const response_data = formData;
      //   console.log('This is the FORM DATA***************',response_data)
      //   // submitResponse(formData)

      // }

      function handleSubmit(event) {
        const submitBTN:any = document.getElementById('submit-btn');
        submitBTN.innerHTML='Submitting';
        submitBTN.disabled = true;
        const domForm = document.getElementById('dom-form');
        console.log(domForm)
        // Prevent the default form submission behavior
        event.preventDefault();
    
        // Access the form that triggered the event
        const form = event.target;
    
        // Create an array to hold the form data in the desired format
        const formDataArray = [];
    
        // Iterate over each form element
        for (const element of form.elements) {
            // Skip elements without a name (e.g., submit buttons)
            if (!element.name) {
                continue;
            }
    
            // Determine the type of input
            const type = element.type;
    
            // Get the label text associated with the form element
            let label = '';
            const labelElement = form.querySelector(`label[htmlFor="${element.id}"]`);
            console.log('For this element, ', element,'Type is',element.type ,'\n This si the label ', labelElement)
            if (labelElement) {
                label = labelElement.textContent.trim();
            }

            if (type === 'checkbox' && label=='') {
              label = element.parentNode.parentNode.parentNode.firstChild.textContent;
            }

            // if(type==='file'){
            //   label = element.parentNode.parentNode.parentNode.firstChild.textContent;
            // }

            if(type=='select-one'){
              label = element.parentNode.firstChild.textContent;
            }
    
            // Determine the answer based on the element type
            let answer = '';
            let id = '';
            switch (type) {
                case 'text':
                    answer = element.value;
                    id = element.id;
                    break;
                case 'checkbox':
                    answer = element.checked ? element.value : null;
                    if (answer === null) continue;
                    else id = element.id; // Skip unchecked checkboxes
                    break;
                case 'select-one':
                    answer = element.options[element.selectedIndex].value;
                    id = element.id;
                    break;
                case 'file':
                    // For document uploader, collect the file names
                    if(!element.files[0]) continue;
                    answer = element.files[0].name
                    id = element.id;
                    break;
                case 'date':
                    answer = element.value;
                    id = element.id;
                    break;
                case 'radio':
                    answer = element.checked ? element.value:null;
                    if(answer===null) continue;
                    else id = element.id;
                    break;
                default:
                    break;
            }
    
            // Add the form data item to the array
            const formDataItem = {
                label: label,
                type: type,
                answer: answer,
                id:id
            };
    
            formDataArray.push(formDataItem);
        }
    
        // Convert the formDataArray to a JSON string

        const htmlString = domForm.outerHTML;
        formDataArray.push({
          htmlString:htmlString
        })
        const formDataJSON = JSON.stringify(formDataArray);

        const surveyResponse = {
          survey_id: parseInt(params.slug),
          response_data: formDataJSON
        }


    
        // Print the JSON string to the console
        console.log('are you going to submit Response', surveyResponse)
        submitResponse(surveyResponse);
        submitBTN.innerHTML = 'Submitted';
        console.log(formDataJSON);
    }
    

      let i=0;
    
  return (
    <div id='dom-form' className='bg-slate-300 pt-4'>
      {dataFetched==false && <div className="flex justify-center items-center mt-10"><LoaderComponent/></div>}
      {dataFetched===true && <>
        <form onSubmit={handleSubmit} className={'flex flex-col justify-center items-center gap-4 mt-12'} >
        {/* {surveyFields.map((item)=>{
          console.log(item)
        })} */}
       
            <div className="w-[55%] rounded-lg border-t-4 border-blue-500 bg-white p-3 h-28">
              <div className="text-2xl text-center flex justify-center items-center">
                <label className="my-8 w-[100%] text-2xl outline-none text-center">{title}</label>
              </div>
              {/* <div>
                <textarea
                  className="w-[100%] outline-none"
                  placeholder="Survey Description"
                  onChange={(e)=>setSurveyDescription(e.target.value)}
                />
              </div> */}
            </div>
          
       

        {surveyFields && surveyFields.map((item: FormFields) => (
          
        <div className="w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3" key={i}>
        {/* {i=i+1} */}
        {item.type === FieldTypes.TEXTINPUT && (
          <div className="flex flex-col ">
            <label htmlFor={(itemID).toString()} className="mb-3 text-lg" >{item.label} </label>
            <input id={(itemID++).toString()} name='TextField' placeholder="input" />
          </div>
        )}

        {item.type == FieldTypes.DROPDOWN && (
          <div className="flex flex-col ">
            <label className="mb-3 text-lg">{item.label}</label>
            <select id={(itemID++).toString()} name='DropDown' className="w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none">
              <option className="p-10">Choose your pick </option>
              {item.options!.map((itemVal) => (
                <option key={i+1}>
                  <div className="p-10" >{itemVal}</div>
                </option>
              ))}
            </select>
          </div>
        )}
        {item.type == FieldTypes.CHECKBOX && (
          <div className="flex flex-col ">
            <p id='checkbox-label' className="mb-3 text-lg">{item.label} </p>
            <div className="flex flex-col ">
              {item.options?.map((itemVal) => (
                <div className="align-center flex gap-4" key={i+1}>
                  <input id={(itemID++).toString()} value={itemVal} name='Checkbox' type="checkbox" />
                  <label>{itemVal} </label>
                </div>
              ))}
            </div>
          </div>
        )}
        {item.type == FieldTypes.FILEUPLOAD && (
          <div className="flex flex-col ">
            <label htmlFor={(itemID).toString()} className="mb-3 text-lg">
              {item.label}
            </label>
            <div className="flex justify-center items-center">
              <input id={(itemID++).toString()} name='myfile' type="file" className="w-72 max-w-full p-1.5 bg-white text-gray-800 rounded-lg border border-gray-500 file:mr-5 file:border-none file:bg-blue-800 file:px-5 file:py-2 file:rounded-lg file:text-white file:cursor-pointer file:hover:bg-blue-600" />
            </div>
            
          </div>
        )}
        {item.type == FieldTypes.DATE && (
          <div className="flex flex-col ">
            <label htmlFor={(itemID).toString()} className="mb-3 text-lg">
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
              <input name='Date'
                type="date"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Select date"
                id={(itemID++).toString()}
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
                      return <th key={matrixKey++}>{col}</th>;
                    })}
                  </tr>

                    <tbody>
                  {item.matrixRow?.map((row) => {
                    return (
                      <tr key={matrixKey++}>
                        <td>{row}</td>
                        {item.matrixColumn?.map((cola) => {
                            return <td key={matrixKey++} className="text-center" >
                              <input type="radio" name={row+'1'} id={(itemID++).toString()} value={cola}/>
                            </td>
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

        <button id='submit-btn' className="mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800" type={'submit'}>Submit Response</button>
        </form>
      </>}
    </div>
  )
}



// "use client";

// import React, { useEffect, useState } from "react";
// import Navbar from "@/components/UserNavbar";
// import TicketGeneratorButton from "@/components/TicketGeneratorButton";
// import Pagination from "@/components/Pagination";
// import Link from "next/link";
// import { FieldTypes } from "@/components/enums/survey-field-types";
// import { FormFields } from "@/app/admin/surveys/page";

// const paginate = (items: any, pageNumber: any, pageSize: any) => {
//   const startIndex = (pageNumber - 1) * pageSize;
//   return items.slice(startIndex, startIndex + pageSize);
// };

// const surveyData = {

// }

// function Surveys() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 8;
//   // const [allFilteredData, setAllFilteredData] = useState([{}]);
//   // const [filterApplied, setFilterApplied] = useState("");
//   const [myTickets, setMyTickets] = useState([]);
//   // const [currentData, setCurrentData] = useState([]);
//   // const [loading, setLoading] = useState(false);

//   let data = paginate(myTickets, currentPage, pageSize);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/ticket", {
//           headers: {
//             Accept: "application/json",
//             method: "GET",
//           },
//         });

//         if (response) {
//           const ticketData = await response.json();
//           setMyTickets(ticketData);
//           data = paginate(ticketData, currentPage, pageSize);
//           setCurrentData(data);
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const onPageChange = (page: any) => {
//     setCurrentPage(page);
//   };



//   return (
//     <div>
//       <Navbar />

//       <div className="flex items-stretch">
//         {/* <div className="w-[22%] bg-slate-100 items-stretch h-screen">
//           <div className="mx-2 my-1 mt-2 text-xl">Filters</div>
//           <div
//             className={`${
//               filterApplied == "Solved"
//                 ? "border-sky-500 text-sky-500"
//                 : "border-gray-300 text-gray-400"
//             } border-2  py-2 px-4 rounded-lg inline-block cursor-pointer m-2`}
//             // onClick={() => statusFilter("Solved")}
//           >
//             Solved
//           </div>
//           <div
//             className={`${
//               filterApplied == "In Progress"
//                 ? "border-sky-500 text-sky-500"
//                 : "border-gray-300 text-gray-400"
//             } border-2  py-2 px-4 rounded-lg inline-block cursor-pointer `}
//             // onClick={() => statusFilter("In Progress")}
//           >
//             In Progress
//           </div>
//         </div> */}

//         <div className="w-[78%]">
//           {/* <div className="py-6 px-2">
//             <TicketGeneratorButton />
//           </div> */}

//           <div>
//            {formFields?.map((item: FormFields) => (
//               <div className="bg-white w-[55%] p-3 rounded-lg border-l-4 border-blue-500">
//                 {item.type === FieldTypes.TEXTINPUT && (
//                   <div className="flex flex-col ">
//                     <label className="text-lg mb-3">{item.label} </label>
//                     <input placeholder="input" />
//                   </div>
//                 )}

//                 {item.type == FieldTypes.DROPDOWN && (
//                   <div className="flex flex-col ">
//                     <label className="text-lg mb-3">{item.label}</label>
//                     <select className="w-[40%] bg-slate-100 px-4 py-4 rounded-md outline-none">
//                       <option className="p-10">Choose your pick </option>
//                       {item.options!.map((itemVal) => (
//                         <option>
//                           <div className="p-10">{itemVal}</div>
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//                 {item.type == FieldTypes.CHECKBOX && (
//                   <div className="flex flex-col ">
//                     <label className="text-lg mb-3">{item.label} </label>
//                     <div className="flex flex-col ">
//                       {item.options?.map((itemVal) => (
//                         <div className="flex align-center gap-4">
//                           <input type="checkbox" />
//                           <label>{itemVal} </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {item.type == FieldTypes.FILEUPLOAD && (
//                   <div className="flex flex-col ">
//                     <label className="text-lg mb-3" htmlFor="">
//                       {item.label}{" "}
//                     </label>
//                     {/* <input
//                       className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                       type="file"
//                     /> */}
//                     <div className="flex items-center justify-center w-full">
//                       <label
//                         htmlFor="dropzone-file"
//                         className="flex flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//                       >
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                           <svg
//                             className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                             aria-hidden="true"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 20 16"
//                           >
//                             <path
//                               stroke="currentColor"
//                               stroke-linecap="round"
//                               stroke-linejoin="round"
//                               stroke-width="2"
//                               d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                             />
//                           </svg>
//                           <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
//                             <span className="font-semibold">
//                               Click to upload
//                             </span>{" "}
//                             or drag and drop
//                           </p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400">
//                             SVG, PNG, JPG or GIF (MAX. 800x400px)
//                           </p>
//                         </div>
//                         <input
//                           id="dropzone-file"
//                           type="file"
//                           className="hidden"
//                         />
//                       </label>
//                     </div>
//                   </div>
//                 )}
//                 {item.type == FieldTypes.DATE && (
//                   <div className="flex flex-col ">
//                     <label className="text-lg mb-3" htmlFor="">
//                       {item.label}{" "}
//                     </label>
//                     {/* <input type="date" /> */}

//                     <div className="relative max-w-sm">
//                       <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
//                         <svg
//                           className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
//                         </svg>
//                       </div>
//                       <input
//                         type="date"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="Select date"
//                       />
//                     </div>
//                   </div>
//                 )}
//                 {item.type == FieldTypes.MATRIX && (
//                   <div>
//                     <label htmlFor="">{item.label} </label>
//                     <ul className="flex">
//                       <li>Empty </li>
//                       {item.matrixColumn?.map((col) => {
//                         return <li>{col}</li>;
//                       })}
//                     </ul>

//                     {item.matrixRow?.map((row) => {
//                       return (
//                         <ul className="flex">
//                           <li>{row}</li>
//                           {item.matrixColumn?.map((col) => {
//                             return (
//                               <li>
//                                 <input type="radio" name={row} />
//                               </li>
//                             );
//                           })}
//                         </ul>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <Pagination
//             items={
//               formFields.length
//             }
//             currentPage={currentPage}
//             pageSize={pageSize}
//             onPageChange={onPageChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Surveys;