/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

import cardadata from "../../../../public/data/carddata.json";
import tickets from "../../../../public/data/tickets.json";
import surveys from "../../../../public/data/surveys.json";
import feedback2 from "../../../../public/data/feedback.json";
import feedback from "../../../../public/data/feedbackdata2.json";
import Cards from "@/components/repo2/dashboard/Cards/Cards";
import DashboardTickets from "@/components/repo2/dashboard/DashboardTickets/DashboardTickets";
import LineChart from "@/components/repo2/dashboard/Graphs/Ticketgraph";
import DashboardSurvey from "@/components/repo2/dashboard/DashboardSurvey/DashboardSurvey";
import LineChart2 from "@/components/repo2/dashboard/Graphs/Surveygraph";
import DashboardFeedback from "@/components/repo2/dashboard/DashboardFeedbacks/DashboardFeedback";
import FeedbackBarGraph from "@/components/repo2/dashboard/Graphs/Feedbackgraph";
import YourComponent from "@/components/repo2/dashboard/DataPage/page";

const DashBoard = () => {
  const [id, setId] = useState<string>("Tickets");
  const [isTicket, setIsTicket] = useState<boolean>(true);
  const [isHome, setIsHome] = useState<boolean>(true);
  const [isData, setIsData] = useState<boolean>(false);
  const [isGraph, setIsGraph] = useState<boolean>(false);
  const [isSurvey, setIsSurvey] = useState<boolean>(false);
  const [isFeedback, setIsFeedback] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(true);

  const onHover = () => {
    setIsHovered(true);
  };

  const onHoveredleave = () => {
    setIsHovered(false);
  };

  const onDataSelected = () => {
    setIsHome(false);
    setIsData(true);
    setIsGraph(false);
  };

  const onHomeSelected = () => {
    setIsHome(true);
    setIsData(false);
    setIsGraph(false);
  };

  const onGraphSelected = () => {
    setIsHome(false);
    setIsData(false);
    setIsGraph(true);
  };
  const onSelect = (Id: string) => {
    setId(Id);
    setIsTicket(Id === "Tickets");
    setIsSurvey(Id === "Surveys");
    setIsFeedback(Id === "Feedback");
  };

  const Ticketsdata = tickets["tickets"];
  const Surveysdata = surveys["Survey"];
  const Feedbackdata = feedback["edges"];

  const ClassValues = isHovered ? "visible" : "hidden";

  return (
    <>
      <main className="mt-4 flex h-full w-screen gap-4 pl-2 pr-2">
        <aside
          className="grid w-40 grid-rows-4  rounded-md border bg-sky-800"
          style={{ maxHeight: "88vh", minHeight: "88vh" }}
        >
          <div className="row-start-1 row-end-2 flex flex-col items-start justify-center ">
            <div className="w-full pl-0.5">
              <h2
                className={`mb-2 flex gap-2 p-0.5 font-bold text-white ${
                  isHome && "bg-sky-600/40"
                }`}
                onClick={onHomeSelected}
              >
                <svg
                  className="text-white-800 h-6 w-6 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                  />
                </svg>
                Home
              </h2>
              <h2
                className={`mb-2 flex gap-2 p-0.5 font-bold text-white ${
                  isData && "bg-sky-600/40"
                }`}
                onClick={onDataSelected}
              >
                <svg
                  className="text-white-800 h-6 w-6 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M3 11h18M3 15h18m-9-4v8m-8 0h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>
                Data
              </h2>
              <h2
                className={`mb-2 flex gap-2 p-0.5 font-bold text-white ${
                  isGraph && "bg-sky-600/40"
                }`}
                onClick={onGraphSelected}
              >
                <svg
                  className="text-white-800 h-6 w-6 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
                  />
                </svg>
                Graphs
              </h2>
            </div>
          </div>
          <div className="row-start-4 row-end-5 self-center justify-self-center">
            <img
              src="https://miro.medium.com/v2/resize:fit:1080/1*EkDkwOPE8zeAfDA3BjgCAw.png"
              alt="logo"
              width={100}
              height={100}
            />
          </div>
        </aside>
        <div className="w-full overflow-y-auto" style={{ maxHeight: "88vh" }}>
          <div className="mb-4 flex flex-row items-center justify-around">
            {cardadata.map((item) => (
              <Cards
                item={item}
                key={item.id}
                onclick={onSelect}
                isActive={item.id === id}
              />
            ))}
          </div>
          <div className=" flex-grow overflow-auto p-4">
            {isTicket && isHome && (
              <div className="mt-2 grid h-full grid-cols-5 gap-6 pt-4">
                <div className="col-start-1 col-end-4 rounded-lg border-2 border-gray-200 pt-2">
                  <table className="table-auto border-collapse">
                    <caption className="caption-top p-2 font-bold text-sky-800">
                      Recent Tickets ad Status Report
                    </caption>
                    <thead>
                      <tr className=" bg-gray-200/50">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Priority</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Created at</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {Ticketsdata.map((item) => (
                        <DashboardTickets item={item} key={item.id} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-start-4 col-end-6 self-center rounded-lg border-2 border-gray-200 p-2 shadow-lg">
                  <LineChart ticketData={Ticketsdata} />
                </div>
              </div>
            )}
            {isSurvey && isHome && (
              <div className="mt-2 grid h-full grid-cols-5 gap-6 pt-4">
                <div className="col-start-1 col-end-4 rounded-lg border-2 border-gray-200 pt-2">
                  <table className="w-full table-auto border-collapse ">
                    <caption className="caption-top p-2 font-bold text-sky-800">
                      Survey and Responses
                    </caption>
                    <thead>
                      <tr className=" bg-gray-200/50">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Created By</th>
                        <th className="px-4 py-2">Created At</th>
                        <th className="px-4 py-2">Responses</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {Surveysdata.map((item) => (
                        <DashboardSurvey item={item} key={item.id} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-start-4 col-end-6 self-center rounded-lg border-2 border-gray-200 p-2 shadow-lg">
                  <LineChart2 surveys={Surveysdata} />
                </div>
              </div>
            )}

            {isFeedback && isHome && (
              <div className="mt-2 grid h-full grid-cols-5 gap-6 pt-4">
                <div className="col-start-1 col-end-4 rounded-lg border-2 border-gray-200 pt-2">
                  <table className="w-full table-auto border-collapse">
                    <caption className="caption-top p-2 font-bold text-sky-800">
                      Recent Feedbacks
                    </caption>
                    <thead>
                      <tr className="bg-gray-200/50">
                        <th className="px-4 py-2">User</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Feedbackdata.map((item) => (
                        <DashboardFeedback data={item} key={item.from} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-start-4 col-end-6 self-center rounded-lg border-2 border-gray-200 p-2 shadow-lg">
                  <FeedbackBarGraph feedback={feedback2["feedback_data"]} />
                </div>
              </div>
            )}
            {isTicket && isData && <YourComponent />}
            {/* {isFeedback && isData && <YourComponent />} */}
            {isSurvey && isData && <YourComponent />}
          </div>
        </div>
      </main>
    </>
  );
};

export default DashBoard;
