import Button from "../../components/Button";

import FlightFollowingNearby from "../FlightFollowingNearby";
import { FlightDetailTrackData } from "../../network/types/response-props";
import { cn, flightStateAttribute } from "../../lib/utils";
import { BuyPackageType } from "../../hooks/useUserPackageStatus";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { cardClick } from "../../network/analytics/tracker";

interface Props {
  data?: FlightDetailTrackData;
  viewPageAction?: BuyPackageType;
  classNameProps?: string;
}

const FlightFollowing: React.FC<Props> = ({ data, classNameProps }) => {
  /*forbidden means that user already have a package*/
  // const isPremium = viewPageAction === "forbidden";
  const { className, label } = flightStateAttribute(data?.flight?.flight_state);
  const navigate = useNavigate();
  const idPlane = data?.flight?.flight_no;
  const dateFlight = moment(data?.flight?.departure_time)?.format("YYYY-MM-DD");
  const departureCode = data?.flight?.departure_code;
  const arrivalCode = data?.flight?.arrival_code;
  const flightCompany = data?.flight?.flight_company;

  return (
    <>
      <div
        className={`p-4 pb-[22px] shadow-md rounded-2xl mt-4 ${classNameProps}`}
        style={{
          backgroundBlendMode: "color-dodge, normal",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "rgba(238, 238, 238, 0.44)",
          height: 303,
          margin: "16px 0 0 0",
          display: "flex",
        }}
        onClick={() => {
          cardClick(
            `${flightCompany} ${idPlane}`,
            "Followed Flights",
            "Followed Flights",
            window.location.pathname
          );
          return navigate(
            {
              pathname: "/flight/detail",
              search: `?id=${idPlane}&date=${dateFlight}&departure=${departureCode}&arrival=${arrivalCode}`,
            },
            { state: { flightDetail: data?.flight } }
          );
        }}
      >
        <div className="w-full">
          <div className="mb-4 flex">
            <Button
              label={String(label) || "-"}
              className={cn(
                "font-semibold w-full !text-[13px] first-letter:uppercase",
                className
              )}
              onClick={() => {}}
            />
          </div>
          <FlightFollowingNearby data={data} />
        </div>
      </div>
    </>
  );
};

export default FlightFollowing;
