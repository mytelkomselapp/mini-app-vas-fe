import { FlightDetailData } from "../../network/types/response-props";
import { flightStateAttribute } from "../../lib/utils";
// import IcoPlane from "../../assets/ico_plane.svg";
import Show from "../../components/Show";
import { Image } from "@tarojs/components";
// import ChevronRight from "../../assets/chevron-right-16px.svg";
// import { useNavigate } from "react-router-dom";

interface Props {
  data?: FlightDetailData;
  isRoamaxEligible: boolean;
}

const FlightDetailsCard: React.FC<Props> = ({ data, isRoamaxEligible }) => {
  const { className, label } = flightStateAttribute(data?.flight_state);
  // const navigate = useNavigate();
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "IcoPlane";
  };

  const handleNavigatoToFlightInfo = () => {
    // navigate(`/flight/happiness-index/${data?.id}`);
  };

  return (
    <div className="bg-white rounded-2xl text-left shadow-[0_10px_34px_rgba(0,0,0,0.1)] min-h-80">
      <div className="flex justify-between p-4">
        <p className="text-sm/[22px] font-semibold text-[#181C21]">
          Detail Penerbangan
        </p>
        <Show when={isRoamaxEligible}>
          <div
            className="flex items-center gap-2"
            onClick={handleNavigatoToFlightInfo}
          >
            <p className="text-xs">Selengkapnya</p>
            {/* <img src={ChevronRight} /> */}
          </div>
        </Show>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 px-4">
          {data?.flight_logo ? (
            <Image
              src={data.flight_logo}
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
              key={data.flight_no}
            />
          ) : (
            <></>
          )}
          <div className="flex flex-col">
            <p className="text-base text-[#181C21]">
              {data?.flight_company} {data?.flight_no}
            </p>
            <Show when={isRoamaxEligible}>
              <span className="text-[#008E53] text-[10px] font-bold bg-[#EDFCF0] px-2 py-[2px] rounded-[20px] inline-block w-fit">
                RoaMAX Inflight Tersedia
              </span>
            </Show>
          </div>
        </div>

        <div className="grid grid-cols-2 grid-flow-row gap-5 text-center">
          <div className="flex flex-col gap-1">
            <p className=" text-xs/[18px] text-[#757F90]">Flight Status</p>
            <p
              className={
                "px-3 py-1 m-auto w-fit rounded-[120px] text-[10px]/[14px] text-[#0452ad] font-semibold first-letter:uppercase bg-[#dfebfb] " +
                className
              }
            >
              {label}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs/[18px] text-[#757F90]">Flight Duration</p>
            <p className="text-sm/[22px] text-[#181C21] font-semibold">
              {convertMinutesToTime(data?.flight_duration || "")}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className=" text-xs/[18px] text-[#757F90]">Check-in Counter</p>
            <p className="text-sm/[22px] text-[#181C21] font-semibold">
              {data?.checkin_counter || "-"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className=" text-xs/[18px] text-[#757F90]">Boarding Gate</p>
            <p className="text-sm/[22px] text-[#181C21] font-semibold">
              {data?.boarding_gate || "-"}
            </p>
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <p className=" text-xs/[18px] text-[#757F90]">Baggage Carousel</p>
            <p className="text-sm/[22px] text-[#181C21] font-semibold">
              {data?.baggage_carousel || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const convertMinutesToTime = (minutesString: string) => {
  const minutes = parseInt(minutesString, 10);

  if (isNaN(minutes) || minutes < 0) {
    return "-";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} h ${remainingMinutes} m`;
};

export default FlightDetailsCard;
