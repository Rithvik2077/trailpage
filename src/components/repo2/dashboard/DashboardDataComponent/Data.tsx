import React from "react";

const TicketSystem = () => {
  // Sample ticket data
  const tickets = [
    {
      id: 1,
      name: "John Doe",
      title: "Issue 1",
      priority: "High",
      status: "Open",
      createdDate: "2024-04-01",
      category: "Bug",
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Issue 2",
      priority: "Low",
      status: "Closed",
      createdDate: "2024-04-03",
      category: "Feature Request",
    },
    {
      id: 3,
      name: "Jane",
      title: "Issue 3",
      priority: "Medium",
      status: "Open",
      createdDate: "2024-04-03",
      category: "HardWare Problem",
    },
    {
      id: 4,
      name: "Smith",
      title: "Issue 4",
      priority: "High",
      status: "Open",
      createdDate: "2024-04-03",
      category: "External Request",
    },
    {
      id: 5,
      name: "JaneSmith",
      title: "Issue 5",
      priority: "Low",
      status: "Closed",
      createdDate: "2024-04-03",
      category: "Cleaning Request",
    },
    {
      id: 6,
      name: "Jane Smith",
      title: "Issue 6",
      priority: "Medium",
      status: "Closed",
      createdDate: "2024-04-03",
      category: "Leave Request",
    },
    {
      id: 7,
      name: "Jane Smith",
      title: "Issue 7",
      priority: "Low",
      status: "Open",
      createdDate: "2024-04-03",
      category: "Technical Problem",
    },
    {
      id: 8,
      name: "Jane Smith",
      title: "Issue 8",
      priority: "High",
      status: "Closed",
      createdDate: "2024-04-03",
      category: "Feature Request",
    },
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 ">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-sky-900 to-sky-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            Tickets Table
          </h6>
        </div>
        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Name
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Title
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Priority
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Status
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Created Date
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Category
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
                      {ticket.name}
                    </p>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
                      {ticket.title}
                    </p>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
                      {ticket.priority}
                    </p>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
                      {ticket.status}
                    </p>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
                      {ticket.createdDate}
                    </p>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
                      {ticket.category}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TicketSystem;
