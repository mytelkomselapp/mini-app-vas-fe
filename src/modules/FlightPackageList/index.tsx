import * as React from "react";
import { ReactComponent as PlaneIcon } from "../../assets/ico_plane_blue.svg";
import Show from "../../components/Show";
import { FlightFreemiumPackageData } from "../../network/types/response-props";
import Skeleton from "react-loading-skeleton";
import { select_item } from "../../network/analytics/tracker";

interface Props {
  data?: FlightFreemiumPackageData[];
  onClick?: (packageData: FlightFreemiumPackageData) => void;
  isLoading: boolean;
}

const FlightPackageList: React.FC<Props> = ({ data, onClick, isLoading }) => {
  return (
    <div>
      <div className="mt-[36px] mb-6">
        <Show
          when={!isLoading}
          fallbackComponent={
            <React.Fragment>
              <Skeleton width={150} height={18} borderRadius={8} />
            </React.Fragment>
          }
        >
          <span className="font-batikSans font-bold text-[18px]">
            Paket Travel
          </span>
        </Show>
      </div>

      <Show
        when={!isLoading}
        fallbackComponent={
          <React.Fragment>
            {Array(3)
              .fill(null)
              ?.map((_, i) => (
                <div
                  key={i}
                  className="mb-2 bg-white p-4 rounded-2xl cursor-pointer"
                >
                  <div className="flex flex-row justify-between">
                    <div className="flex-col flex">
                      <Skeleton height={14} width={80} borderRadius={16} />
                      <Skeleton height={14} width={150} borderRadius={16} />
                    </div>
                    <div className="flex-col flex justify-center">
                      <Skeleton height={14} width={100} borderRadius={16} />
                    </div>
                  </div>
                </div>
              ))}
          </React.Fragment>
        }
      >
        {data?.map((val: FlightFreemiumPackageData, i: number) => {
          return (
            <div
              key={i}
              className="mb-2 bg-white p-4 rounded-2xl cursor-pointer"
              onClick={() => {
                select_item(
                  "1",
                  "Tracking Flight Package",
                  [
                    {
                      item_id: i.toString(),
                      item_name: val?.name,
                      index: i,
                      price: val?.price,
                      item_list_id: "1",
                      item_list_name: "Tracking Flight Package",
                    },
                  ],
                  "Tracking Flight Package",
                  ""
                );
                onClick?.(val);
              }}
            >
              <div className="flex flex-row justify-between">
                <div className="flex-col flex">
                  <div className="bg-[#EFEFFF] px-2 py-[2px] w-max rounded-lg flex justify-center items-center mb-2 gap-1">
                    <PlaneIcon />
                    <span className="text-[10px] text-[#14278C] font-sans">
                      Paket Travel
                    </span>
                  </div>

                  <span className="text-xs font-semibold font-sans leading-[18px]">
                    {val?.name}
                  </span>
                </div>
                <div className="flex-col flex">
                  <span className="text-solidRed text-xs leading-8 font-semibold font-sans">
                    {"Rp" +
                      parseFloat(String(val?.price))?.toLocaleString("id") ||
                      "0"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </Show>
    </div>
  );
};

export default FlightPackageList;
