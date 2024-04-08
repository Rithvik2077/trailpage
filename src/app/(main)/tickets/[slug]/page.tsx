"use client";

import { myTickets } from "@/../../public/data/myTickets";
// import { postTicket } from "@/lib/data";
import React, { useState } from "react";

const MovieTicketForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    ticketId: "",
    ticketCategory: "",
    ticketSubCategory: "",
    ticketSubject: "",
    ticketDescription: "",
    ticketPriority: "",
  });
  const [subCategoryLocal] = useState({
    Admin: ["admin1", "admin2", "admin3", "admin4", "admin5"],
    "Human Resources": ["hr1", "hr2", "hr3", "hr4", "hr5"],
    "Information Technology": ["it1"],
  });

  const handleChange = (event: any) => {
    console.log(event);
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeCategory = (event: any) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    const ticketSubCategoryRef = document.getElementById("ticketSubCategory");
    if (ticketSubCategoryRef) {
      ticketSubCategoryRef.innerHTML = "";
      const option = document.createElement("option");
      option.innerHTML = "-- Select Subcategory --";
      ticketSubCategoryRef?.appendChild(option);
    }
    console.log(ticketSubCategoryRef);

    subCategoryLocal[value].map((ele: string) => {
      const option = document.createElement("option");
      option.innerHTML = ele;
      ticketSubCategoryRef?.appendChild(option);
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    // const res = await fetch("/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });

    // postTicket(formData);
    // myTickets.push(formData);
    console.log(formData);
  };

  return (
    <form className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl px-6">
        <div className="ticket overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="ticket-header bg-blue-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white">#1245</h2>
          </div>

          <div className="ticket-body p-6">
            <div className="mb-6">
              <label
                htmlFor="ticketCategory"
                className="mb-1 block text-sm font-semibold text-gray-600"
              >
                Category
              </label>
              <select
                id="ticketCategory"
                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                name="ticketCategory"
                onChange={handleChangeCategory}
              >
                <option value="">-- Select category --</option>
                <option value="Admin">Admin</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Information Technology">
                  Information Technology
                </option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="ticketSubCategory"
                className="mb-1 block text-sm font-semibold text-gray-600"
              >
                Subcategory
              </label>
              <select
                id="ticketSubCategory"
                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                name="subTicketCategory"
              >
                <option value="">First Select category</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="ticketTitle"
                className="mb-1 block text-sm font-semibold text-gray-600"
              >
                Subject
              </label>
              <input
                type="text"
                id="ticketTitle"
                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter ticket title"
                name="ticketSubject"
                value={formData.ticketSubject}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="ticketContent"
                className="mb-1 block text-sm font-semibold text-gray-600"
              >
                Description
              </label>
              <textarea
                id="ticketContent"
                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                // rows="3"
                name="ticketDescription"
                placeholder="Enter ticket content"
                value={formData.ticketDescription}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                htmlFor="ticketAssigned"
                className="mb-1 block text-sm font-semibold text-gray-600"
              >
                Priority
              </label>
              <select
                id="ticketAssigned"
                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                name="ticketPriority"
                value={formData.ticketPriority}
                onChange={handleChange}
              >
                <option>-- Select Priority --</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MovieTicketForm;
