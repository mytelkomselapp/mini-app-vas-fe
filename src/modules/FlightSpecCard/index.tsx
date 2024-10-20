import IcoPlane from "../..//..//..//../assets/ico_plane.svg";
import { FlightDetailData } from "../..//..//..//../network/types/response-props";

interface Props {
  data?: FlightDetailData;
}

const FlightSpecCard: React.FC<Props> = ({ data }) => {
  console.log({ data });
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = IcoPlane;
  };
  const EmptyState = () => {
    return (
      <div className="bg-white rounded-2xl text-left shadow-[0_10px_34px_rgba(0,0,0,0.1)] min-h-80">
        <div className="flex flex-col justify-center">
          <p className="text-xs text-grey px-4 pt-4">Tipe Pesawat</p>
          <p className=" text-[#181C21] px-4 mt-1">{"Tidak Tersedia"}</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 grid-flow-row gap-5 text-center px-4 pb-4">
            <div className="h-[1px] w-full bg-dividerGrey mt-4 px-4" />
            <div className="flex flex-row">
              <p className=" text-xs/[18px] text-[#757F90]">
                Rata-rata Delay Keberangkatan
              </p>
              <p className="text-sm/[22px] text-[#181C21] font-semibold ml-auto">
                {"-"}
              </p>
            </div>
            <div className="flex flex-row ">
              <p className="text-xs/[18px] text-[#757F90]">
                Rata-rata Delay Kedatangan
              </p>
              <p className="text-sm/[22px] text-[#181C21] font-semibold ml-auto">
                {convertMinutesToTime(data?.flight_duration || "")}
              </p>
            </div>
            <div className="flex flex-row">
              <p className=" text-xs/[18px] text-[#757F90]">
                {"Jumlah Bagasi"}
              </p>
              <p className="text-sm/[22px] text-[#181C21] font-semibold ml-auto">
                {data?.checkin_counter || "-"}
              </p>
            </div>
            <div className="flex flex-row">
              <p className=" text-xs/[18px] text-[#757F90]">{"Jumlah Kursi"}</p>
              <p className="text-sm/[22px] text-[#181C21] font-semibold ml-auto">
                {data?.boarding_gate || "-"}
              </p>
            </div>
            <div className="flex flex-row">
              <p className=" text-xs/[18px] text-[#757F90]">{"Usia Pesawat"}</p>
              <p className="text-sm/[22px] text-[#181C21] font-semibold ml-auto">
                {data?.boarding_gate || "-"}
              </p>
            </div>
            <div className="flex flex-row">
              <p className=" text-xs/[18px] text-[#757F90]">
                {"Emisi CO2/flight"}
              </p>
              <p className="text-sm/[22px] text-[#181C21] font-semibold ml-auto">
                {data?.boarding_gate || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  if (!data?.length) {
    return <EmptyState />;
  } else
    return (
      <div className="bg-white rounded-2xl text-left shadow-[0_10px_34px_rgba(0,0,0,0.1)] min-h-80">
        <div className="flex flex-col justify-center text-center">
          <p className="text-xs text-grey px-4 pt-4">Tipe Pesawat</p>
          <p className="font-semibold text-[#181C21] px-4 mt-1">
            {"Boeing 777-300ER Large aircraft"}
          </p>
        </div>
        <div className="h-[1px] w-full bg-dividerGrey my-4" />
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-4">
            {data?.flight_logo ? (
              <img
                src={data.flight_logo}
                className="w-10"
                key={data.flight_no}
                onError={handleImageError}
              />
            ) : (
              <></>
            )}
            <p className="text-base text-[#181C21]">
              {data?.flight_company} {data?.flight_no}
            </p>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-5 text-center">
            <div className="flex flex-col gap-1">
              <p className=" text-xs/[18px] text-[#757F90]">
                Rata-rata Delay Keberangkatan
              </p>
              <p className="text-sm/[22px] text-[#181C21] font-semibold">
                {"-"}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs/[18px] text-[#757F90]">
                Rata-rata Delay Kedatangan
              </p>
              <p className="text-sm/[22px] text-[#181C21] font-semibold">
                {convertMinutesToTime(data?.flight_duration || "")}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className=" text-xs/[18px] text-[#757F90]">
                {"Jumlah Bagasi"}
              </p>
              <p className="text-sm/[22px] text-[#181C21] font-semibold">
                {data?.checkin_counter || "-"}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className=" text-xs/[18px] text-[#757F90]">{"Jumlah Kursi"}</p>
              <p className="text-sm/[22px] text-[#181C21] font-semibold">
                {data?.boarding_gate || "-"}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className=" text-xs/[18px] text-[#757F90]">{"Usia Pesawat"}</p>
              <p className="text-sm/[22px] text-[#181C21] font-semibold">
                {data?.boarding_gate || "-"}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className=" text-xs/[18px] text-[#757F90]">
                {"Emisi CO2/flight"}
              </p>
              <p className="text-sm/[22px] text-[#181C21] font-semibold">
                {data?.boarding_gate || "-"}
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

export default FlightSpecCard;
