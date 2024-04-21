/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
// import Navbar from "@/components/UserNavbar";
// import TicketGeneratorButton from "@/components/TicketGeneratorButton";
// import Pagination from "@/components/Pagination";
import Link from "next/link";
import Navbar from "@/components/repo2/Navbar";
import TicketGeneratorButton from "@/components/repo2/TicketGeneratorButton";
import Pagination from "@/components/repo2/Pagination";
import Modal from "@/components/repo2/Modal";

const paginate = (items: any, pageNumber: any, pageSize: any) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
  // return items;
};

function Tickets() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [allFilteredData, setAllFilteredData] = useState([{}]);
  const [filterApplied, setFilterApplied] = useState("");
  const [myTickets, setMyTickets] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
  }, []);

  function AssignTicket(id) {
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
  }

  function AssignButton(id) {
    // return <div>Assign</div>;
    return (
      <div
        className="cursor-pointer rounded-lg bg-slate-500 px-2 py-1 text-white"
        onClick={() => AssignTicket(id)}
      >
        Assign
      </div>
    );
  }

  let data = paginate(myTickets, currentPage, pageSize);
  useEffect(() => {
    const fetchData = async () => {
      const body_params = {
        options: {
          status: 0,
          sub_category: 0,
          group: 0,
          priority: 0,
          closed_by: 0,
        },
      };
      try {
        setLoading(true);
        const response = await fetch("/api/tickets/admin/getalltickets", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          // body: JSON.stringify(body_params),
        });
        if (response) {
          const ticketDataRes = await response.json();

          console.log("ticket ->", ticketDataRes);
          console.log(ticketDataRes.Response.result);

          const ticketData = ticketDataRes.Response.result;
          setMyTickets(ticketData);
          data = paginate(ticketData, currentPage, pageSize);
          setCurrentData(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filterApplied == "") {
      data = paginate(myTickets, currentPage, pageSize);
    } else {
      data = paginate(allFilteredData, currentPage, pageSize);
    }
    setCurrentData(data);
  }, [currentPage, filterApplied]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const statusFilter = (str: string) => {
    if (str == filterApplied) {
      setAllFilteredData([{}]);
      setFilterApplied("");
      return;
    }

    setFilterApplied(str);
    const filteredData = myTickets.filter((single: any) => {
      return single.ticketStatus == str;
    });

    setAllFilteredData(filteredData);
    setCurrentPage(1);
    const actualData = paginate(filteredData, currentPage, pageSize);
    setCurrentData(actualData);
  };

  return (
    <div>
      {/* <Modal isOpen={true} onClose={setIsModalOpen(false)} id={1} />; */}
      <div className="flex items-stretch">
        <div className="h-screen w-[22%] items-stretch bg-slate-100">
          <div className="mx-2 my-1 mt-2 text-xl">Filters</div>
          <div
            className={`${
              filterApplied == "Solved"
                ? "border-sky-500 text-sky-500"
                : "border-gray-300 text-gray-400"
            } m-2  inline-block cursor-pointer rounded-lg border-2 px-4 py-2`}
            onClick={() => statusFilter("Solved")}
          >
            Solved
          </div>
          <div
            className={`${
              filterApplied == "In Progress"
                ? "border-sky-500 text-sky-500"
                : "border-gray-300 text-gray-400"
            } inline-block  cursor-pointer rounded-lg border-2 px-4 py-2 `}
            onClick={() => statusFilter("In Progress")}
          >
            In Progress
          </div>
        </div>

        <div
          className="absolute  left-[50%] top-[50%] hidden bg-slate-200"
          id="modal"
        >
          <div>Assign</div>
          <div>Search</div>
          <div className="all-users"></div>
        </div>

        <div className="w-[78%]">
          {/* <div className="px-2 py-6">
            <TicketGeneratorButton />
          </div> */}

          <div>
            {currentData.map((ticket: any) => (
              <div
                key={ticket.id}
                className="flex items-center justify-around border-b border-sky-500  bg-slate-50 py-4"
              >
                <div>
                  {ticket.assignedto || <AssignButton id={ticket.id} />}
                </div>
                <div>{ticket.title}</div>
                <div
                  className={`${
                    ticket.status == "Open" ? "bg-red-500" : "bg-green-500 "
                  }  rounded-full px-2 py-1 text-sm text-white`}
                >
                  {ticket.status}
                </div>
                <div>{ticket.createdat}</div>
                <Link
                  href={{ pathname: "./tickets/show", query: ticket }}
                  className="cursor-pointer rounded-full bg-blue-200 px-2 py-1 text-sm text-blue-500 hover:bg-blue-100"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          <Pagination
            items={
              filterApplied == "" ? myTickets.length : allFilteredData.length
            }
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Tickets;
