import Navbar from "../../components/Navbar";
import "../../App.css";
import FlightInfoCard from "../../modules/FlightInfocard";
import { useFetchFlightTrack } from "../../network";
import { FlightDetailTrackData } from "../../network/types/response-props";
import { screenView } from "../../network/analytics/tracker";
import { useEffect } from "react";
import RenderVerticalList from "../../components/RenderVerticalList/RenderVerticalList";
import { ReactComponent as NotFound } from "../../assets/not_found.svg";
import Show from "../../components/Show";
import { cn } from "../../lib/utils";
import LoadingScreen from "../../components/LoadingScreen";

const FollowingPenerbangan = () => {
  const { data: rawDataTrackedFlight, isFetching } = useFetchFlightTrack();
  const trackedFlightRawData = rawDataTrackedFlight?.data;
  const trackedFlights = trackedFlightRawData?.data?.tracked_flights || [];

  useEffect(() => {
    screenView("Followed Flight"); //fire screen view tracker
  }, []);

  return (
    <div className="flex flex-col bg-[#EFF1F4] h-screen overflow-hidden">
      <div className="p-4">
        <Navbar title="Penerbangan Diikuti" />
      </div>
      <Show
        when={!isFetching}
        fallbackComponent={<LoadingScreen text="Loading" />}
      >
        <Show
          when={trackedFlights.length > 0}
          fallbackComponent={
            <div className="flex justify-center min-h-[calc(100vh-11rem)]">
              <div className="flex flex-col items-center justify-center text-center">
                <NotFound className="mt-1" />
                <span className="text-base font-semibold font-sans mt-1">
                  Penerbangan tidak ditemukan
                </span>
                <span className="text-gray-500 text-xs font-normal font-sans whitespace-pre my-1">
                  {`Silakan cek kembali rute dan tanggal\npenerbangan yang kamu input`}
                </span>
              </div>
            </div>
          }
        >
          <RenderVerticalList data={trackedFlights} keyIndex="id" pageSize={10}>
            {({ flight }: FlightDetailTrackData, index) => (
              <div
                className={cn("px-4", {
                  "pb-[6px]": index === 0,
                  "py-[6px]": index > 0,
                })}
              >
                <FlightInfoCard
                  key={flight.flight_no}
                  flight_no={flight.flight_no}
                  flight_logo={flight.flight_logo}
                  flight_company={flight.flight_company}
                  flight_state={flight.flight_state}
                  flightId={flight.id}
                  flight_duration={flight.flight_duration}
                  departure_code={flight.departure_code}
                  arrival_code={flight.arrival_code}
                  departure_time={flight.departure_time}
                  arrival_time={flight.arrival_time}
                  flightDetail={flight}
                />
              </div>
            )}
          </RenderVerticalList>
        </Show>
      </Show>
    </div>
  );
};

export default FollowingPenerbangan;
