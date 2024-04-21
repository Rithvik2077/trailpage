import React, { useState, useEffect } from "react";

const TicketCategoryTable = () => {
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("API_ENDPOINT")
      .then((response) => response.json())
      .then((data) => {
        setTicketData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12 ">
      <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-8 overflow-hidden rounded-xl bg-gradient-to-tr from-sky-900 to-sky-800 bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20">
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased">
            Ticket Status by Subcategory
          </h6>
        </div>
        <div className="overflow-x-scroll p-6 px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-left">
                  <p className="text-blue-gray-400 block font-sans text-[11px] font-bold uppercase antialiased">
                    Subcategory Name
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-left">
                  <p className="text-blue-gray-400 block font-sans text-[11px] font-bold uppercase antialiased">
                    Open Tickets
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-left">
                  <p className="text-blue-gray-400 block font-sans text-[11px] font-bold uppercase antialiased">
                    Closed Tickets
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-left">
                  <p className="text-blue-gray-400 block font-sans text-[11px] font-bold uppercase antialiased">
                    In Progress Tickets
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-left">
                  <p className="text-blue-gray-400 block font-sans text-[11px] font-bold uppercase antialiased">
                    Total Tickets
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {ticketData.map((row, index) => (
                <tr key={index}>
                  <td className="border-blue-gray-50 border-b px-5 py-3">
                    <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                      {row.subcategory_name}
                    </p>
                  </td>
                  <td className="border-blue-gray-50 border-b px-5 py-3">
                    <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                      {row.open_tickets}
                    </p>
                  </td>
                  <td className="border-blue-gray-50 border-b px-5 py-3">
                    <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                      {row.closed_tickets}
                    </p>
                  </td>
                  <td className="border-blue-gray-50 border-b px-5 py-3">
                    <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                      {row.in_progress_tickets}
                    </p>
                  </td>
                  <td className="border-blue-gray-50 border-b px-5 py-3">
                    <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                      {row.open_tickets +
                        row.closed_tickets +
                        row.in_progress_tickets}
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

export default TicketCategoryTable;
