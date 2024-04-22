import React from "react";
import TicketSystem from "@/components/repo2/dashboard/DashboardDataComponent/TicketData/Data";
import TicketCategoryTable from "@/components/repo2/dashboard/DashboardDataComponent/TicketData/CategoryData";

const TicketComponent = ({ ticketData, Ticketsdata }) => {
  return (
    <>
      <TicketSystem Ticketsdata={Ticketsdata} />
      <TicketCategoryTable ticketData={ticketData} />
    </>
  );
};

export default TicketComponent;
