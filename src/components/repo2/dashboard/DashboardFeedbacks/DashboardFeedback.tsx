import React from "react";
import feedbackdata2 from "@/../../public/data/feedbackdata2.json";

interface DashboardFeedbackProps {
  data: {
    from: number;
    to: number;
    created_at: string;
  };
}

const DashboardFeedback: React.FC<DashboardFeedbackProps> = ({ data }) => {
  const { from, to, created_at } = data;
  const Styles = from % 2 === 1 ? "bg-gray-50" : "";

  const userdetails = feedbackdata2["nodes"].find(
    (item: any) => item.id === from,
  );
  const feedbackDetails = feedbackdata2["nodes"].find(
    (item: any) => item.id === to,
  );

  const user = userdetails ? userdetails.label : "Anonymous";
  const { title, label } = feedbackDetails || {};

  return (
    <tr className={Styles}>
      <td className="border px-4 py-2">{user}</td>
      <td className="border px-4 py-2">{title}</td>
      <td className="border px-4 py-2">{label}</td>
      <td className="border px-4 py-2">{created_at}</td>
    </tr>
  );
};

export default DashboardFeedback;
