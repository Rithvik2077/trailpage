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
