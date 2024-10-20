import React from "react";
import { ReactComponent as AirplaneWithLine } from "../../assets/airplane-with-line.svg";
import { cardClick } from "../../network/analytics/tracker";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { cn, flightStateAttribute } from "../../lib/utils";
import IcoPlane from "../../assets/ico_plane.svg";
import { ReactComponent as Plane } from "../../assets/ico_plane.svg";
import { FlightDetailData } from "../../network/types/response-props";
import Show from "../../components/Show";

interface FlightInfoCardProps {
  flightDetail?: FlightDetailData;
  isRoamaxEligible: boolean;
}

const FlightInfoCard: React.FC<FlightInfoCardProps> = ({
  flightDetail,
  isRoamaxEligible,
}) => {
  const navigate = useNavigate();

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
    navigate(
      {
        pathname: "/flight/detail",
        search: `?id=${flightDetail?.flight_no}&date=${dateFlight}&departure=${flightDetail?.departure_code}&arrival=${flightDetail?.arrival_code}`,
      },
      { state: { flightDetail } }
    );
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = IcoPlane;
  };
  return (
    <div onClick={() => handleOnClick()}>
      <div className="min-h-[104px] bg-white rounded-2xl p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {flightDetail?.flight_logo ? (
              <img
                src={flightDetail?.flight_logo}
                className="w-6"
                key={flightDetail?.flight_no}
                onError={handleImageError}
              />
            ) : (
              <>
                <Plane />
              </>
            )}
            <p className="text-xs">{`${flightDetail?.flight_company} ${flightDetail?.flight_no}`}</p>
          </div>
          <p
            className={cn(
              "px-2 py-1 rounded-full text-[8px] font-bold text-[#0050AE] first-letter:uppercase",
              className
            )}
          >
            {label}
          </p>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="flex flex-col text-start">
            <span className="font-medium">
              {extractTime(flightDetail?.departure_time)}
            </span>
            <span>{flightDetail?.departure_code}</span>
          </div>
          <div className="flex flex-col items-center">
            <AirplaneWithLine />
            <p className="text-[#9CA9B9] text-[10px] font-light">
              {convertMinutesToTime(flightDetail?.flight_duration || "")}
            </p>
          </div>
          <div className="flex flex-col text-end">
            <span className="font-medium">
              {extractTime(flightDetail?.arrival_time)}
            </span>
            <span>{flightDetail?.arrival_code}</span>
          </div>
        </div>
        <Show when={isRoamaxEligible}>
          <div className="mt-2">
            <span className="text-[#008E53] text-[10px] font-bold bg-[#EDFCF0] px-2 py-[2px] rounded-[20px]">
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
