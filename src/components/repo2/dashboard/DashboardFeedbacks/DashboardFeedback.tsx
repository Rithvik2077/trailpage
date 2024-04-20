import React from "react";
import feedbackdata2 from "@/../../public/data/feedbackdata2.json";

interface DashboardFeedbackProps {
  data: {
    id: number;
    username: string;
    title: string;
    description: string;
    createdat: string;
  };
}

const DashboardFeedback: React.FC<DashboardFeedbackProps> = ({ data }) => {
  const { id, title, description, username, createdat } = data;
  const Styles = id % 2 === 1 ? "bg-gray-50" : "";

  return (
    <tr className={Styles}>
      <td className="border px-4 py-2">{username}</td>
      <td className="border px-4 py-2">{title}</td>
      <td className="border px-4 py-2">{description.slice(0, 10) + "...."}</td>
      <td className="border px-4 py-2">{createdat.slice(0, 10)}</td>
    </tr>
  );
};

export default DashboardFeedback;
