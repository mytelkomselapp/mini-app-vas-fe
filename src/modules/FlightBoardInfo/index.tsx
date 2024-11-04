import { FlightDetailData } from "../../network/types/response-props";
import flightRoute from "../../assets/flight-route.png";
import moment from "moment";
import { Image } from "@tarojs/components";

interface Props {
  data?: FlightDetailData;
}

const FlightFollowingNearby: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative flex flex-row justify-between">
      <div className="flex flex-col gap-2 text-left">
        <p className="text-white text-base">{formatTime(data?.departure_time)}</p>
        <p className="text-white text-[40px] leading-[60px]">
          {data?.departure_code}
        </p>
        <div>
          <p className="text-white text-[10px]/3">
            {data?.departure} {data?.departure_airport}
          </p>
          <p className="text-white text-[10px]/3">{data?.departure_terminal}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-right">
        <p className="text-white text-base">{formatTime(data?.arrival_time)}</p>
        <p className="text-white text-[40px] leading-[60px]">
          {data?.arrival_code}
        </p>
        <div>
          <p className="text-white text-[10px]/3">
            {data?.arrival} {data?.arrival_airport}
          </p>
          <p className="text-white text-[10px]/3">{data?.arrival_terminal}</p>
        </div>
      </div>

      <Image style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
        width: '111px',
        height: '32px'
      }} src={flightRoute} />
    </div>
  );
};

const formatTime = (date: string | undefined) => {
  return date ? moment(date).format("DD MMM YY, HH:mm") : "";
};

export default FlightFollowingNearby;
