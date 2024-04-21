"use client";

import React, { useEffect, useState } from "react";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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

  const [category, setCategory] = useState([]);

  const [subCategoryLocal, setSubCategoryLocal] = useState(new Map());
  const [categoryNametoId, setCategoryNametoId] = useState(new Map());

  useEffect(() => {
    async function getFormData() {
      const response = await fetch("/api/tickets/createtickets/getformdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        // body: JSON.stringify(body_params),
      });

      const data = await response.json();
      const categories = data.Response.result.groups;
      console.log(data.Response.result);
      console.log("cat", categories);
      setCategory(categories);

      console.log("final cat", category);
      const map = new Map();
      const categoryToSubCategory = new Map();
      const ticketCategory = document.getElementById("ticketCategory");
      categories.map((cat) => {
        console.log(" ,", cat);
        const option = document.createElement("option");
        option.value = cat.groupname;
        option.innerHTML = cat.groupname;
        ticketCategory.appendChild(option);

        map.set(cat.id, cat.groupname);
        categoryToSubCategory.set(cat.groupname, []);
      });

      const allSub = data.Response.result.categories;
      allSub.map((sub) => {
        const group = map.get(sub.group_id);

        const last = categoryToSubCategory.get(group);
        last.push(sub.categoryname);
        categoryToSubCategory.set(group, last);

        categoryNametoId.set(sub.categoryname, sub.id);
      });

      console.log("pro", categoryToSubCategory);
      setSubCategoryLocal(categoryToSubCategory);
    }

    getFormData();
  }, []);

  const handleChange = (event: any) => {
    console.log(event);
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubChangeCategory = (event: any) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);

    const catId = Number(categoryNametoId.get(value));
    setFormData((prevState) => ({ ...prevState, [name]: catId }));
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

    console.log("subCategoryLocal", subCategoryLocal);
    subCategoryLocal.get(value).map((ele: string) => {
      const option = document.createElement("option");
      option.value = ele;
      option.innerHTML = ele;
      ticketSubCategoryRef?.appendChild(option);
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    const postTicketData = {
      sub_category_id: formData.ticketSubCategory,
      priority: 1,
      title: formData.ticketSubject,
      description: formData.ticketDescription,
      created_by: 1,
    };

    try {
      const res = await fetch("/api/tickets/createtickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postTicketData),
      });

      const response = await res.json();

      console.log("post data", response);
      console.log(formData);
      window.location.href = "/user/tickets";
    } catch (error) {
      console.log(error);
    }
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
                name="ticketSubCategory"
                onChange={handleSubChangeCategory}
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
