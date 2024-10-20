import Navbar from "../../components/Navbar";
import { useFetchFlightByCity } from "../../network";
import { FlightDetailData } from "../../network/types/response-props";
import "../../App.css";
import FlightInfoCard from "../../modules/FlightInfocard";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { screenView } from "../../network/analytics/tracker";
import moment from "moment";
import RenderVerticalList from "../../components/RenderVerticalList/RenderVerticalList";
import { ReactComponent as NotFound } from "../../assets/not_found.svg";
import Show from "../../components/Show";
import { cn } from "../../lib/utils";
import LoadingScreen from "../../components/LoadingScreen";
import FlightRoamaxCard from "../../modules/FlightRoamaxCard";

const ListPenerbangan = () => {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const originId = searchParams.get("originId") || "";
  const destinationId = searchParams.get("destinationId") || "";
  const date = String(searchParams.get("date")) || "";
  const dateLabel = moment(date).format("DD MMMM YYYY");

  const location = useLocation();
  const passedFlightsData = location.state?.flightsByNumberData;
  const bypassAPICall = !!passedFlightsData;

  const {
    data: flightRawData,
    refetch,
    isFetching,
  } = useFetchFlightByCity(originId, destinationId, date);
  const flightData = flightRawData?.data;
  const flightList = bypassAPICall
    ? passedFlightsData?.flights
    : flightData?.data?.flights || [];

  useEffect(() => {
    screenView("Search Results"); //fire screen view tracker
    if (!bypassAPICall) refetch();
  }, []);

  return (
    <div className="flex flex-col pt-4 bg-[#EFF1F4] h-screen overflow-hidden">
      <div className="px-4 pb-4">
        <Navbar title="Hasil Pencarian" />
      </div>
      <div className="flex justify-between px-4 mb-4">
        <div className="text-start">
          <Show when={passedFlightsData}>
            <p>ID Pesawat</p>
            <h2 className="font-semibold">{passedFlightsData?.flightNumber}</h2>
          </Show>
          <Show when={!passedFlightsData}>
            <p>Route</p>
            <h2 className="font-semibold">
              {origin} - {destination}
            </h2>
          </Show>
        </div>
        <div className="text-end">
          <p>Date</p>
          <h2 className="font-semibold">{dateLabel}</h2>
        </div>
      </div>
      <Show
        when={!isFetching}
        fallbackComponent={<LoadingScreen text="Loading" />}
      >
        <Show
          when={flightList.length > 0}
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
          <RenderVerticalList
            data={flightList}
            keyIndex="id"
            pageSize={10}
            bottomOffset={`-10%`}
          >
            {(item: FlightDetailData, index) => (
              <div
                className={cn("px-4", {
                  "pb-[6px]": index === 0,
                  "py-[6px]": index > 0,
                  "pb-[52px]": index === flightList.length - 1,
                })}
              >
                <Show
                  when={index === 3}
                  fallbackComponent={
                    <FlightInfoCard
                      key={item.flight_no}
                      flightDetail={item}
                      isRoamaxEligible={index < 2}
                    />
                  }
                >
                  <FlightRoamaxCard isEligible={true} key={`roamax-${index}`} />
                </Show>
              </div>
            )}
          </RenderVerticalList>
        </Show>
      </Show>
    </div>
  );
};

export default ListPenerbangan;
