"use client";

import React, { useEffect, useState } from "react";
import TicketGeneratorButton from "@/components/repo2/TicketGeneratorButton";
import Pagination from "@/components/repo2/Pagination";
import Link from "next/link";

const paginate = (items: any, pageNumber: any, pageSize: any) => {
  // const startIndex = (pageNumber - 1) * pageSize;
  // return items.slice(startIndex, startIndex + pageSize);
};

export default function Surveys({ surveyData }: { surveyData: any }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  // const [allFilteredData, setAllFilteredData] = useState([{}]);
  const [filterApplied, setFilterApplied] = useState("");
  const [myTickets, setMyTickets] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [loading, setLoading] = useState(false);

  let data = paginate(surveyData, currentPage, pageSize);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch("/api/ticket", {
  //         headers: {
  //           Accept: "application/json",
  //           method: "GET",
  //         },
  //       });

  //       if (response) {
  //         const ticketData = await response.json();
  //         setMyTickets(ticketData);
  //         data = paginate(ticketData, currentPage, pageSize);
  //         setCurrentData(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

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
            {surveyData.map((survey: any) => (
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
            ))}
          </div>

          <Pagination
            items={surveyData.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
