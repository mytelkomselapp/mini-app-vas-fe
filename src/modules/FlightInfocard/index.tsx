import React, { useEffect, useState } from "react";
import AirplaneWithLine from "../../assets/airplane-with-line.svg";
import { cardClick } from "../../network/analytics/tracker";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { cn, flightStateAttribute, handleNavigate } from "../../lib/utils";
import Plane from "../../assets/ico_plane.svg";
import IcoPlane from "../../assets/ico_plane.svg";
import { FlightDetailData } from "../../network/types/response-props";
import Show from "../../components/Show";
import { Image } from "@tarojs/components";

interface FlightInfoCardProps {
  flightDetail?: FlightDetailData;
  isRoamaxEligible: boolean;
}

const FlightInfoCard: React.FC<FlightInfoCardProps> = ({
  flightDetail,
  isRoamaxEligible,
}) => {
  // const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [srcPlane, setSrcPlane] = useState(IcoPlane);
  const [classNamePlane, setClassNamePlane] = useState(
    "!w-[1.5rem] !h-[1.5rem]"
  );

  const { className, label } = flightStateAttribute(flightDetail?.flight_state);

  //for tracker
  const pageTitle: string = window.location.pathname.includes("following")
    ? "Followed Flights"
    : "Search Result";
  const listName: string = pageTitle;

  const handleOnClick = () => {
    const dateFlight = moment(flightDetail?.departure_time)?.format(
      "YYYY-MM-DD"
    );
    cardClick(
      `${flightDetail?.flight_company} ${flightDetail?.flight_no}`,
      listName,
      pageTitle,
      window.location.pathname
    );

    handleNavigate(
      "/pages/DetailPenerbangan/index",
      `?id=${flightDetail?.flight_no}&date=${dateFlight}&departure=${flightDetail?.departure_code}&arrival=${flightDetail?.arrival_code}`,
      { flightDetail }
    );
  };

  useEffect(() => {
    setSrcPlane(flightDetail?.flight_logo);
  }, [flightDetail]);

  const handleImageError = () => {
    setSrcPlane(Plane);
    setClassNamePlane("!w-6 !h-6");
    setHasError(true);
  };
  return (
    <div onClick={() => handleOnClick()}>
      <div className=" bg-white rounded-[16px] p-[12px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            {flightDetail?.flight_logo ? (
              <>
                <Image
                  src={hasError ? Plane : srcPlane}
                  className="w-6 h-6"
                  key={flightDetail?.flight_no}
                  onError={handleImageError}
                />
              </>
            ) : (
              <>
                <Image src={Plane} className="w-[24px] h-[24px]" />
              </>
            )}
            <p className="text-[12px]">{`${flightDetail?.flight_company} ${flightDetail?.flight_no}`}</p>
          </div>
          <span
            className={cn(
              "px-[8px] py-[4px] rounded-full font-bold text-[#0050AE] first-letter:uppercase",
              className
            )}
            style={{
              fontSize: "8px"
            }}
          >
            {label}
          </span>
        </div>
        <div className="flex justify-between items-center pt-[8px]">
          <div className="flex flex-col text-start">
            <span className="text-[16px] font-medium">
              {extractTime(flightDetail?.departure_time)}
            </span>
            <span className="text-[16px]">{flightDetail?.departure_code}</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={AirplaneWithLine} className="w-[189px] h-[17px]" />
            <p className="text-[#9CA9B9] text-[10px] font-light">
              {convertMinutesToTime(flightDetail?.flight_duration || "")}
            </p>
          </div>
          <div className="flex flex-col text-end">
            <span className="text-[16px] font-medium">
              {extractTime(flightDetail?.arrival_time)}
            </span>
            <span className="text-[16px]">{flightDetail?.arrival_code}</span>
          </div>
        </div>
        <Show when={isRoamaxEligible}>
          <div className="flex mt-[8px]">
            <span className="text-[#008E53] text-[10px] font-bold bg-[#EDFCF0] px-[8px] py-[2px] rounded-[20px]">
              RoaMAX Inflight Tersedia
            </span>
          </div>
        </Show>
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

const extractTime = (date: string | undefined) => {
  return date ? moment(date).format("HH:mm") : "-";
};

export default FlightInfoCard;
