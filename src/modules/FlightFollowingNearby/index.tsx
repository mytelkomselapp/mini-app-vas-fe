import { FlightDetailTrackData } from "../../network/types/response-props";
import Flight from "../../assets/flight-without-route.svg";
import moment from "moment";
import IcoPlane from "../../assets/ico_plane_white.svg";
import { Image } from "@tarojs/components";
import { useEffect, useState } from "react";

interface Props {
  data?: FlightDetailTrackData;
}

const FlightBoardInfo: React.FC<Props> = ({ data }) => {
  const [srcPlane, setSrcPlane] = useState(IcoPlane);
  const [classNamePlane, setClassNamePlane] = useState(
    "!w-6 !h-6 bg-white rounded-2xl"
  );
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    setSrcPlane(data?.flight?.flight_logo);
  }, [data]);

  const handleImageError = () => {
    setSrcPlane(IcoPlane);
    setClassNamePlane("!w-6 !h-6");
    setHasError(true);
  };
  return (
    <>
      <div className="flex items-center gap-2 flex-row">
        {data?.flight?.flight_logo ? (
          <Image
            src={hasError ? IcoPlane : srcPlane}
            className={hasError ? "!w-6 !h-6" : classNamePlane}
            key={data?.flight?.flight_no}
            onError={handleImageError}
          />
        ) : (
          <></>
        )}
        <p className="text-xs text-white">
          {data?.flight?.flight_company} {data?.flight?.flight_no || "-"}
        </p>
        <p className="text-white text-xs ml-auto">
          {formatTime(data?.flight?.departure_time || "-")}
        </p>
      </div>
      <div className="flex flex-row justify-between mt-2">
        <div className="flex flex-col gap-2 text-left w-[103px]">
          <p className="text-white text-2xl font-semibold">
            {data?.flight?.departure_code || "-"}
          </p>
          <div>
            <p className="text-white text-[10px]/3">
              {data?.flight?.departure_airport || "-"}
            </p>
            <p className="text-white text-[10px]/3">
              {data?.flight?.departure_terminal || "-"}
            </p>
          </div>
        </div>
        <img src={Flight} className="w-6 h-6" />
        <div className="flex flex-col gap-2 text-right w-[103px]">
          <p className="text-white text-2xl font-semibold">
            {data?.flight?.arrival_code || "-"}
          </p>
          <div>
            <p className="text-white text-[10px]/3">
              {data?.flight?.arrival_airport || "-"}
            </p>
            <p className="text-white text-[10px]/3">
              {data?.flight?.arrival_terminal || "-"}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] flex bg-dividerGrey my-6" />
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="text-white text-xs">Check-in</p>
          <p className="text-white text-sm font-semibold text-left">
            {data?.flight?.checkin_counter || "-"}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-white text-xs">Boarding Gate</p>
          <p className="text-white text-sm font-semibold text-center">
            {data?.flight?.boarding_gate || "-"}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-white text-xs">Baggage</p>
          <p className="text-white text-sm font-semibold text-right">
            {data?.flight?.baggage_carousel || "-"}
          </p>
        </div>
      </div>
    </>
  );
};

const formatTime = (date: string | undefined) => {
  return date ? moment(date).format("DD MMM YY • HH:mm") : "";
};

export default FlightBoardInfo;
