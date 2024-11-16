import ChevronRight from "../../assets/chevron-right.svg";
import React from "react";
import { FlightETicketData } from "../../network/types/response-props";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { cardClick } from "../../network/analytics/tracker";
import { handleNavigate } from "../../lib/utils";

interface FlightTicket {
  ticket: FlightETicketData;
}

const FlightTicketCard: React.FC<FlightTicket> = ({ ticket }) => {
  const handleClick = () => {
    handleNavigate('/pages/CreateDetailTicket/index', ``, {
      state: ticket
    })
  };

  const formattedDate = format(
    parseISO(ticket.ticket_date),
    "dd MMM yyyy • HH:mm"
  );

  return (
    <div
      onClick={() => {
        cardClick(
          ticket?.ticket_name,
          "My Ticket",
          "My Ticket",
          window.location.pathname
        );
        handleClick();
      }}
      className="bg-white p-4 rounded-2xl "
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-primaryBlack text-sm font-semibold">
            {ticket.ticket_name}
          </p>
          <p className="text-grey text-[10px]">
            {formattedDate} • {ticket.flight_no}
          </p>
        </div>
        <div>
          <img src={ChevronRight} className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default FlightTicketCard;
