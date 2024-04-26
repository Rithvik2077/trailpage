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
import Loading from "@/components/Common/Loading";

const paginate = (items: any, pageNumber: any, pageSize: any) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
  // return items;
};

function Tickets() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [allFilteredData, setAllFilteredData] = useState([{}]);
  const [filterApplied, setFilterApplied] = useState("");
  const [myTickets, setMyTickets] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsModal, setDetailsModal] = useState(null);
  const [assignTicket, setAssignTicket] = useState(null);
  const [allUsersArr, setAllUsersArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/admin/getallusers", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          // body: JSON.stringify(body_params),
        });
        const res = await response.json();
        const allUsers = res.Response.result;
        console.log("all", allUsers);
        setAllUsersArr(allUsers);

        setLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, []);

  async function assignTicketToUser(ticket_id, user_id) {
    console.log("A", ticket_id, user_id);
    const body_params = {
      user_id,
      ticket_id,
    };

    const user = document.getElementById(user_id);
    console.log("USER", user);
    user.innerHTML = "Assigning...";

    try {
      const res = await fetch("/api/tickets/admin/assignticket", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(body_params),
      });

      const response = await res.json();
      console.log("ress", response);
      setAssignTicket(null);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  function AssignTicket(id, title) {
    console.log("tic", title);
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");

    // const message = document.createElement("div");
    // message.innerHTML = `Ticket ${id} : ${title} `;
    // modal.appendChild(message);
    const header = document.getElementsByClassName("header")[0];
    header.innerHTML = `Ticket ${id} : ${title} `;

    const container = document.getElementsByClassName("all-users")[0];
    container.innerHTML = "";
    allUsersArr.map((user) => {
      const div = document.createElement("div");
      div.id = user.id;
      div.innerHTML = user.username;
      div.addEventListener("click", () => assignTicketToUser(id, user.id));
      container.appendChild(div);
    });
  }

  function AssignButton({ ticket }) {
    console.log("TICKET", ticket);
    return (
      <span
        className="cursor-pointer rounded-lg bg-slate-500 px-2 py-1 text-white"
        // onClick={() => AssignTicket(ticket.id, ticket.title)}
        onClick={() => setAssignTicket(ticket)}
      >
        Assign
      </span>
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
      console.log(str + " -- " + single.status);
      return single.status == str;
    });

    setAllFilteredData(filteredData);
    setCurrentPage(1);
    const actualData = paginate(filteredData, currentPage, pageSize);
    setCurrentData(actualData);
  };

  const clickHandler = () => {
    return (event: React.MouseEvent) => {
      console.log("CLCLC");
      setDetailsModal(null);
      setAssignTicket(null);
      event.preventDefault();
    };
  };

  async function updateStatusById(id) {
    const markAsClosed = document.getElementById("markAsClosed");
    markAsClosed.innerHTML = "Marking...";

    console.log(id);
    const body_params = {
      ticket_id: id,
      status: 4,
    };
    try {
      const response = await fetch("/api/tickets/updatestatus", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(body_params),
      });

      const res = await response.json();
      console.log("update", res);
      setDetailsModal(null);
    } catch (error) {
      console.log(error);
    }
  }

  console.log("allUsersArr", allUsersArr);
  return (
    <div className="">
      {loading ? (
        <Loading size={75} />
      ) : (
        <div>
          {/* <Modal isOpen={true} onClose={setIsModalOpen(false)} id={1} />; */}
          {detailsModal ? (
            <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center bg-slate-500 bg-opacity-70 ">
              <div className="relative rounded-md bg-white ">
                <div className="absolute -right-3 -top-3  rounded-full bg-slate-600 px-3 py-1  text-white">
                  <button onClick={clickHandler()}>X</button>
                </div>

                <div className="flex w-fit max-w-sm flex-col items-center justify-center ">
                  <div className="flex flex-col gap-4 ">
                    <div className="flex items-center gap-4  rounded-t-md bg-indigo-500 px-7 py-5 text-white">
                      <div>#{detailsModal.id}</div>
                      <div className="text-2xl">{detailsModal.title}</div>
                      <div
                        className={`${
                          detailsModal.status == "Open"
                            ? "bg-red-500"
                            : "bg-green-500 "
                        }  rounded-full px-2 py-1 text-sm text-white`}
                      >
                        {detailsModal.status}
                      </div>
                    </div>
                    <div className="px-7  text-lg">
                      {detailsModal.description}
                    </div>

                    <div className=" px-7 py-5">
                      <div className="bg-gray text-sm text-zinc-400">
                        {"Opened at : "}
                        {new Date(detailsModal.createdat).toLocaleString()}
                      </div>

                      {detailsModal.status == "Open" ? (
                        <div className="flex justify-center">
                          <button
                            id="markAsClosed"
                            className="mt-2 rounded-md bg-black px-4 py-2 text-center text-white"
                            onClick={() => updateStatusById(detailsModal.id)}
                          >
                            Mark as closed
                          </button>
                        </div>
                      ) : (
                        <div className="bg-gray text-sm text-zinc-400">
                          {"Closed at : "}
                          {new Date(detailsModal.closedat).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : assignTicket ? (
            <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center bg-slate-500 bg-opacity-70 ">
              <div className="relative m-10 rounded-md bg-white">
                <div className=" absolute -right-3 -top-3  rounded-full bg-slate-600 px-3 py-1  text-white">
                  <button onClick={clickHandler()}>X</button>
                </div>

                <div className="flex w-fit max-w-sm flex-col items-center justify-center ">
                  <div className="flex flex-col gap-4 ">
                    <div className="flex items-center gap-4 rounded-t-md  bg-indigo-500 px-7 py-5 text-white">
                      <div>#{assignTicket.id}</div>
                      <div className="text-2xl">{assignTicket.title}</div>
                    </div>
                    <div className="text-lg"></div>

                    <div className="scroll h-96 overflow-auto px-5 pb-2 ">
                      {allUsersArr.map((user) => (
                        <div
                          className=" mb-2 grid cursor-pointer items-center overflow-hidden rounded-[10px] bg-white py-2.5 pl-2.5 pr-[30px] shadow-[0_5px_7px_-1px_rgba(51,51,51,0.23)] hover:scale-[1.1] hover:shadow-[0_9px_47px_11px_rgba(51,51,51,0.18)]"
                          onClick={() =>
                            assignTicketToUser(assignTicket.id, user.id)
                          }
                        >
                          <div id={user.id}>{user.username}</div>
                          <div className="bg-gray text-sm text-zinc-400">
                            {user.email}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-stretch">
              <div className="h-screen w-[18%] items-stretch bg-slate-100">
                <div className="mx-2 my-1 mt-2 text-xl">Filters</div>
                <div
                  className={`${
                    filterApplied == "Closed"
                      ? "border-sky-500 text-sky-500"
                      : "border-gray-300 text-gray-400"
                  } m-2  inline-block cursor-pointer rounded-lg border-2 px-4 py-2`}
                  onClick={() => statusFilter("Closed")}
                >
                  Solved
                </div>
                <div
                  className={`${
                    filterApplied == "Open"
                      ? "border-sky-500 text-sky-500"
                      : "border-gray-300 text-gray-400"
                  } inline-block  cursor-pointer rounded-lg border-2 px-4 py-2 `}
                  onClick={() => statusFilter("Open")}
                >
                  In Progress
                </div>
              </div>

              <div className="w-[82%]">
                {/* <div className="px-2 py-6">
            <TicketGeneratorButton />
          </div> */}

                <table className="w-[100%]">
                  <tr className=" m-10 bg-gray-200/50">
                    <th className="px-10 py-3 text-left">Assigned To</th>
                    <th className="px-10 py-3 text-left">Title</th>
                    <th className="px-10 py-3 text-left">Status</th>
                    <th className="px-10 py-3 text-left">Created at</th>
                    <th className="px-10 py-3 text-left">Details</th>
                  </tr>

                  {/* <tbody className="center bg-white"> */}
                  {currentData.map((ticket: any) => (
                    <tr
                      key={ticket.id}

                      // className="items-left flex  border-b border-sky-500  bg-slate-50 py-4"
                    >
                      <td className="border-b border-sky-500 px-10 py-3">
                        {ticket.assignedto || <AssignButton ticket={ticket} />}
                      </td>
                      <td className="border-b border-sky-500 px-10 py-3">
                        {ticket.title}
                      </td>
                      <td className="border-b border-sky-500 px-10 py-3">
                        <span
                          className={`${
                            ticket.status == "Open"
                              ? "bg-red-500"
                              : "bg-green-500 "
                          }  rounded-full px-2 py-1 text-sm text-white`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="border-b border-sky-500 px-10 py-3">
                        {new Date(ticket.createdat).toLocaleString()}
                      </td>
                      <td
                        className="border-b border-sky-500"
                        onClick={() => setDetailsModal(ticket)}
                      >
                        <span className=" cursor-pointer rounded-full bg-blue-200   px-3 py-1 text-sm text-blue-500 hover:bg-blue-100">
                          View Details
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* </tbody> */}
                </table>

                <Pagination
                  items={
                    filterApplied == ""
                      ? myTickets.length
                      : allFilteredData.length
                  }
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onPageChange={onPageChange}
                />
              </div>

              <div className=" hidden w-[22%] bg-slate-200 p-5" id="modal">
                <div className="flex justify-end">
                  <button onClick={clickHandler()}>X</button>
                </div>
                <div className="header"></div>
                <div>
                  <input type="search" />
                </div>
                <div className="all-users"></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Tickets;
