//import { useParams } from "react-router-dom";
import FlightIcon from "../../assets/mosque.svg";
import Navbar from "../../components/Navbar";
import FlightSeatInformation from "../../modules/FlightSeatInformation";
import FlightSpecCard from "../../modules/FlightSpecCard";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const DetailPesawat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const location = useLocation();

  return (
    <>
      <div className="bg-[#E2E2E2] h-full p-4 flex flex-col">
        <Navbar title="Informasi Penerbangan" />
        <div className="flex flex-col gap-4 my-4 flex-grow">
          <div className="bg-white rounded-2xl text-left p-4">
            <div className="flex flex-row gap-2 items-center mb-[13px]">
              <FlightIcon className="w-[30px]" />
              <span className="text-sm">Garuda Indonesia</span>
            </div>
            <span className="text-xs text-grey">
              {
                "Ketepatan waktu dihitung berdasarkan tingkat keberangkatan dan kedatangan tepat waktu selama 30 hari terakhir."
              }
            </span>
          </div>
          {/* @ts-ignore */}
          <FlightSpecCard data={[]} />
          <img src={FlightSeatInformation} />
        </div>
      </div>
    </>
  );
};

export default DetailPesawat;
