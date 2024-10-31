import RenderVerticalList from "../../components/RenderVerticalList/RenderVerticalList";
import Show from "../../components/Show";
import { cn } from "../../lib/utils";
import FlightInfoCard from "../../modules/FlightInfocard";
import FlightRoamaxCard from "../../modules/FlightRoamaxCard";
import { FlightDetailData } from "@/network/types/response-props";
import { useFetchFlightByCity } from "../../network";
import { useLocation } from "react-router-dom";
import moment from "moment";

const ListPenerbangan = () => {
  const originId = "2139";
  const destinationId = "2179";
  const date = "2024-11-24";
  const origin = "Jakarta";
  const destination = "Bali (Denpasar)";
  const { data: flightRawData } = useFetchFlightByCity(
    originId,
    destinationId,
    date
  );
  const dateLabel = moment(date).format("DD MMMM YYYY");

  const location = useLocation();
  const passedFlightsData = location.state?.flightsByNumberData;
  const bypassAPICall = !!passedFlightsData;

  const flightData = flightRawData?.data;
  const flightList = bypassAPICall
    ? passedFlightsData?.flights
    : flightData?.data?.flights || [];
  return (
    <div className="flex flex-col bg-[#EFF1F4] h-screen overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-base">Route</span>
            <span className="font-semibold text-[16px]">
              {origin} - {destination}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-base text-end">Date</span>
            <span className="font-semibold text-base text-end">
              {dateLabel}
            </span>
          </div>
        </div>
      </div>
      <Show
        when={flightList?.length > 0}
        fallbackComponent={
          <div className="flex justify-center min-h-[calc(100vh-11rem)]">
            <div className="flex flex-col items-center justify-center text-center">
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
              <Show when={index === 3}>
                <div className="pb-4">
                  <FlightRoamaxCard isEligible={true} key={`roamax-${index}`} />
                </div>
              </Show>
              <FlightInfoCard
                key={item.flight_no}
                flightDetail={item}
                isRoamaxEligible={index < 2}
              />
            </div>
          )}
        </RenderVerticalList>
      </Show>
    </div>
  );
};

export default ListPenerbangan;
