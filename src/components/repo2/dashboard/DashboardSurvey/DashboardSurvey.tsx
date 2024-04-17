import React from "react";

interface DashboardSurveyProps {
  item: {
    id: number;
    title: string;
    created_by: string;
    created_at: string;
    response_count: number;
  };
}

const DashboardSurvey: React.FC<DashboardSurveyProps> = ({ item }) => {
  const { id, title, created_by, created_at, response_count } = item;
  const Styles = id % 2 === 1 ? "bg-gray-50" : "";

  return (
    <tr className={Styles}>
      <td className="border px-2 py-2">{title}</td>
      <td className="border px-2 py-2">{created_by}</td>
      <td className="border px-2 py-2">{created_at}</td>
      <td className="border px-2 py-2">{response_count}</td>
    </tr>
  );
};

export default DashboardSurvey;
