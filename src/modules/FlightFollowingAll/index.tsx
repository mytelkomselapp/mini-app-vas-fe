import { ReactComponent as ChevronRight } from "../../assets/chevron-right.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg";
import { useNavigate } from "react-router-dom";
import { FlightDetailTrackData } from "../../network/types/response-props";
import moment from "moment";
import { cardClick, sectionClick } from "../../network/analytics/tracker";
interface Props {
  data?: FlightDetailTrackData[];
}

const FlightFollowingAll: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="p-4 pb-[18px] shadow-md rounded-2xl mt-4"
        style={{
          backgroundBlendMode: "color-dodge, normal",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "rgba(238, 238, 238, 0.44)",
          height: 303,
        }}
      >
        <div
          className="mb-4 flex items-center cursor-pointer"
          onClick={() => {
            sectionClick("See All Flight", "", "/detail");
            navigate({
              pathname: "/flight/list-following",
            });
          }}
        >
          <p className="text-white text-sm font-semibold">
            Lihat Semua Penerbangan
          </p>
          <ChevronRight className="invert grayscale ml-auto" />
        </div>

        {data?.slice(0, 3)?.map((val, i) => {
          const departureDate = moment(val?.flight?.departure_time)?.isValid()
            ? moment(val?.flight?.departure_time)?.format("DD MMM YYYY • HH:mm")
            : "-";
          return (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white bg-blend-color-dodge mb-2"
              onClick={() => {
                const idPlane = val?.flight?.flight_no;
                const dateFlight = moment(val?.flight?.departure_time)?.format(
                  "YYYY-MM-DD"
                );
                const departureCode = val?.flight?.departure_code;
                const arrivalCode = val?.flight?.arrival_code;
                const flightCompany = val?.flight?.flight_company;
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
                  { state: { flightDetail: val?.flight } }
                );
              }}
            >
              <div className="flex items-center gap-1">
                <p className="font-semibold">{val?.flight?.departure_code}</p>
                <ArrowRight />
                <p className="font-semibold">{val?.flight?.arrival_code}</p>
              </div>
              <div>
                <p className="text-[10px] text-grey">
                  {`${departureDate} • ${val?.flight?.flight_no} `}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FlightFollowingAll;
