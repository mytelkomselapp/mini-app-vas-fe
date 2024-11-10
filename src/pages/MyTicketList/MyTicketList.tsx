import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import FlightTicketCard from "../../modules/FlightTicketCard";
import { FlightETicketData } from "../../network/types/response-props";
import { useNavigate } from "react-router-dom";
import NotFound from "../../assets/not_found.svg";
import Show from "../../components/Show";
import { cn } from "../../lib/utils";
import RenderVerticalList from "../../components/RenderVerticalList/RenderVerticalList";
import { useFetchETickets } from "../../network";
import LoadingScreen from "../../components/LoadingScreen";
import { buttonClick } from "../../network/analytics/tracker";
import { useFlightTicketForm } from "../../store/flight";

const MyTicketList = () => {
  const navigate = useNavigate();

  const { data: eTicketRawData, isFetching } = useFetchETickets();
  const eTickets = eTicketRawData?.data?.data ?? [];

  const currentTime = new Date();
  const currentDate = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate()
  );

  const upcomingETicket = eTickets.filter((ticket) => {
    const ticketTime = new Date(ticket.ticket_date);
    const ticketDate = new Date(
      ticketTime.getFullYear(),
      ticketTime.getMonth(),
      ticketTime.getDate()
    );
    return ticketDate >= currentDate;
  });

  const { resetFlightTicketState } = useFlightTicketForm();
  const handleAddTicket = () => {
    resetFlightTicketState();
    navigate("/flight/create-ticket/0");
  };

  return (
    <div className="flex flex-col h-screen pt-4 bg-inactiveGrey overflow-hidden">
      {/* <div className="px-4 mb-4">
        <Navbar title="My Ticket" />
      </div> */}
      <Show
        when={!isFetching}
        fallbackComponent={<LoadingScreen text="Loading" />}
      >
        <Show
          when={upcomingETicket?.length > 0}
          fallbackComponent={
            <div className="flex flex-1 flex-col items-center justify-center text-center">
               <img src={NotFound} className="w-[128px] h-[128px]"/>
              <span className="text-base font-semibold font-sans mt-1">
                Belum ada tiket ditambahkan
              </span>
              <span className="text-gray-500 text-xs font-normal font-sans whitespace-pre my-1">
                {`Yuk tambah tiketmu dengan cara isi detail\npenerbangan dan upload e-ticketmu`}
              </span>
            </div>
          }
        >
          <RenderVerticalList
            data={upcomingETicket}
            keyIndex="id"
            pageSize={10}
          >
            {(data: FlightETicketData, index) => (
              <div
                className={cn("px-4", {
                  "pb-[8px]": index === 0,
                  "py-[8px]": index > 0,
                })}
              >
                <FlightTicketCard ticket={data} />
              </div>
            )}
          </RenderVerticalList>
        </Show>
        <div className="mt-auto px-4 pb-8 pt-2 bg-inactiveGrey">
          <Button
            label="Tambah Ticket"
            onClick={() => {
              buttonClick(
                "Add Ticket",
                "Add Ticket",
                "My Ticket",
                window.location.pathname
              );
              handleAddTicket();
            }}
          />
        </div>
      </Show>
    </div>
  );
};

export default MyTicketList;
