import RenderVerticalList from "../../components/RenderVerticalList/RenderVerticalList";
import Show from "../../components/Show";
import { cn, getNavigateState } from "../../lib/utils";
import FlightInfoCard from "../../modules/FlightInfocard";
import FlightRoamaxCard from "../../modules/FlightRoamaxCard";
import NotFound from "../../assets/not_found.svg";
import { FlightDetailData } from "@/network/types/response-props";
import { useFetchFlightByCity } from "../../network";
import moment from "moment";
import LoadingScreen from "../../components/LoadingScreen";
import { useMemo } from "react";
import Taro from "@tarojs/taro";

const ListPenerbangan = () => {
  const searchParams = Taro.getCurrentInstance().router?.params;
  const originId = searchParams?.originId || '';
  const destinationId = searchParams?.destinationId || '';
  const date = searchParams?.date || '';
  const origin = decodeURIComponent(searchParams?.origin || '');
  const destination = decodeURIComponent(searchParams?.destination || '');
  const { data: flightRawData, isFetching } = useFetchFlightByCity(
    originId,
    destinationId,
    date
  );
  const dateLabel = moment(date).format("DD MMMM YYYY");

  const currentPath = Taro.getCurrentInstance().router?.path || "";
  const state = useMemo(() => getNavigateState(currentPath), [currentPath]);

  const passedFlightsData = state?.flightsByNumberData;
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
        when={!isFetching}
        fallbackComponent={<LoadingScreen text="Loading" />}
      >
        <Show
          when={flightList?.length > 0}
          fallbackComponent={
            <div className="flex justify-center min-h-[calc(100vh-11rem)]">
              <div className="flex flex-col items-center justify-center text-center">
                <img src={NotFound} className="w-[128px] h-[128px]" />
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
      </Show>
    </div>
  );
};

export default ListPenerbangan;
