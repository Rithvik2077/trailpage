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

interface DashBoardProps {}

const DashBoard: React.FC<DashBoardProps> = () => {
  const [id, setId] = useState<string>("Tickets");
  const [isTicket, setIsTicket] = useState<boolean>(true);
  const [isSurvey, setIsSurvey] = useState<boolean>(false);
  const [isFeedback, setIsFeedback] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(true);

  const onHover = () => {
    setIsHovered(true);
  };

  const onHoveredleave = () => {
    setIsHovered(false);
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
    <div className="mt-2 flex h-full w-full gap-4 p-2">
      <aside className="h-1/1 grid-row-4 grid  w-40 place-items-stretch rounded-lg bg-sky-800 pb-4">
        <div className="row-start-1 row-end-2 flex flex-col items-start justify-center ">
          <div className="w-full pl-2">
            <h2 className="mb-2 font-bold text-white">Home</h2>
            <h2 className="mb-2 font-bold text-white">Graphs</h2>
            <h2 className="mb-2 font-bold text-white">Data</h2>
          </div>
        </div>
        <div className="row-start-3 row-end-4">
          <img
            src="https://miro.medium.com/v2/resize:fit:1080/1*EkDkwOPE8zeAfDA3BjgCAw.png"
            alt="logo"
            width={400}
            height={400}
          />
        </div>
      </aside>
      <div className="h-full w-full">
        <div className="mb-4  flex flex-row items-center justify-around">
          {cardadata.map((item) => (
            <Cards
              item={item}
              key={item.id}
              onclick={onSelect}
              isActive={item.id === id}
            />
          ))}
        </div>
        {isTicket && (
          <div className="mt-2 grid h-full grid-cols-5 pt-4">
            <div className="col-start-1 col-end-3">
              <table className="table-auto border-collapse border-2 border-gray-400">
                <caption className="caption-top p-2 font-bold text-sky-800">
                  Recent Tickets ad Status Report
                </caption>
                <thead className="sticky">
                  <tr className="border-2 border-gray-600">
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Priority</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Created at</th>
                  </tr>
                </thead>
                <tbody className="">
                  {Ticketsdata.map((item) => (
                    <DashboardTickets item={item} key={item.id} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-start-4 col-end-6">
              <LineChart ticketData={Ticketsdata} />
            </div>
          </div>
        )}
        {isSurvey && (
          <div className="mt-2 grid h-full grid-cols-5 pt-4">
            <div className="col-start-1 col-end-4">
              <table className="table-auto border-collapse border-2 border-gray-400">
                <caption className="caption-top p-2 font-bold text-sky-800">
                  Survey and Responses
                </caption>
                <thead>
                  <tr className="border-2 border-gray-600">
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Created By</th>
                    <th className="px-4 py-2">Created At</th>
                    <th className="px-4 py-2">Responses</th>
                  </tr>
                </thead>
                <tbody>
                  {Surveysdata.map((item) => (
                    <DashboardSurvey item={item} key={item.id} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-span-2">
              <LineChart2 surveys={Surveysdata} />
            </div>
          </div>
        )}
        {isFeedback && (
          <div className="mt-2 grid h-full grid-cols-5 pt-4">
            <div className="col-start-1 col-end-4">
              <table className="table-auto border-collapse border-2 border-gray-400">
                <caption className="caption-top p-2 font-bold text-sky-800">
                  Recent Feedbacks
                </caption>
                <thead>
                  <tr className="border-2 border-gray-600">
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
            <div className="col-span-2">
              <FeedbackBarGraph feedback={feedback2["feedback_data"]} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
