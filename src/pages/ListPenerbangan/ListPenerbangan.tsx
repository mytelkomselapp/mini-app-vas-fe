import RenderVerticalList from "../../components/RenderVerticalList/RenderVerticalList";
import Show from "../../components/Show";
import { cn } from "../../lib/utils";
import FlightInfoCard from "../../modules/FlightInfocard";
import FlightRoamaxCard from "../../modules/FlightRoamaxCard";
import FlightData from "./FlightData";
import { FlightDetailData } from "@/network/types/response-props";

const ListFlight = () => {
  const { flightData } = FlightData();
  return (
    <div className="flex flex-col bg-[#EFF1F4] h-screen overflow-hidden">
      <div className="p-[16px]">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[16px]">Route</span>
            <span className="font-semibold text-[16px]">
              Jakarta - Bali (Denpasar)
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] text-end">Date</span>
            <span className="font-semibold text-[16px] text-end">
              25 Oktober 2024
            </span>
          </div>
        </div>
      </div>
      <Show
        when={flightData.length > 0}
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
          data={flightData}
          keyIndex="id"
          pageSize={10}
          bottomOffset={`-10%`}
        >
          {(item: FlightDetailData, index) => (
            <div
              className={cn("px-[16px]", {
                "pb-[6px]": index === 0,
                "py-[6px]": index > 0,
                "pb-[52px]": index === flightData.length - 1,
              })}
            >
              <Show when={index === 3}>
                <div className="pb-[12px]">
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

export default ListFlight;
