import React from "react";

interface DashboardTicketsProps {
  item: {
    id: number;
    title: string;
    body: string;
    priority: string;
    status: string;
    created_at: string;
  };
}

const DashboardTickets: React.FC<DashboardTicketsProps> = ({ item }) => {
  const { id, title, body, priority, status, created_at } = item;
  const Styles = id % 2 === 1 ? "bg-gray-50" : "";

  return (
    <tr className={Styles}>
      <td className="border px-4 py-2">{title}</td>
      <td className="border px-4 py-2">{body}</td>
      <td className="border px-4 py-2">{priority}</td>
      <td className="border px-4 py-2">{status}</td>
      <td className="border px-4 py-2">{created_at}</td>
    </tr>
  );
};

export default DashboardTickets;
