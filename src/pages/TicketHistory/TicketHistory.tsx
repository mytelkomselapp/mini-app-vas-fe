import Navbar from "../../components/Navbar";
import NotFound from "../../assets/not_found.svg";
import { FlightETicketData } from "../../network/types/response-props";
import FlightTicketCard from "../../modules/FlightTicketCard";
import Show from "../../components/Show";
import RenderVerticalList from "../../components/RenderVerticalList/RenderVerticalList";
import { cn } from "../../lib/utils";
import { useFetchETickets } from "../../network";
import LoadingScreen from "../../components/LoadingScreen";

const TicketHistory = () => {
  const { data: eTicketRawData, isFetching } = useFetchETickets();
  const eTickets = eTicketRawData?.data?.data ?? [];

  const currentTime = new Date();
  const currentDate = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate()
  );

  const eTicketHistory = eTickets.filter((ticket) => {
    const ticketTime = new Date(ticket.ticket_date);
    const ticketDate = new Date(
      ticketTime.getFullYear(),
      ticketTime.getMonth(),
      ticketTime.getDate()
    );
    return ticketDate < currentDate;
  });
  return (
    <div className="flex flex-col h-screen pt-4 bg-inactiveGrey overflow-hidden">
      {/* <div className="px-4 mb-4">
        <Navbar title="My Ticket History" />
      </div> */}
      <Show
        when={!isFetching}
        fallbackComponent={<LoadingScreen text="Loading" />}
      >
        <Show
          when={eTicketHistory?.length > 0}
          fallbackComponent={
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <img src={NotFound} className="mt-1" />
              <span className="text-base font-semibold font-sans mt-1">
                Belum ada tiket ditambahkan
              </span>
              <span className="text-gray-500 text-xs font-normal font-sans whitespace-pre my-1">
                {`Yuk tambah tiketmu dengan cara isi detail\npenerbangan dan upload e-ticketmu`}
              </span>
            </div>
          }
        >
          <RenderVerticalList data={eTicketHistory} keyIndex="id" pageSize={10}>
            {(ticket: FlightETicketData, index) => (
              <div
                className={cn("px-4", {
                  "pb-[8px]": index === 0,
                  "py-[8px]": index > 0,
                })}
              >
                <FlightTicketCard key={ticket.flight_no} ticket={ticket} />
              </div>
            )}
          </RenderVerticalList>
        </Show>
      </Show>
    </div>
  );
};

export default TicketHistory;
