import Button from "../../components/Button";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ChevronRight } from "../../assets/chevron-right.svg";
import { ReactComponent as GarudaIcon } from "../../assets/garuda.svg";
import { OrdererDetail } from "./components";

const OrderReview = () => {
  const navigate = useNavigate();
  const handleNavigateToOrderSummary = () => {
    navigate("/travel/order-summary");
  };

  return (
    <div className="flex flex-col bg-inactiveGrey h-full">
      <div className="px-4 mb-4 bg-white">
        <Navbar />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="px-4 pb-4">
          <span className="text-base">{"Selesaikan Pemesananmu"}</span>

          <Card className="mt-4 mb-4">
            <div className="flex-1 grid gap-y-2">
              <span className="text-sm font-semibold">
                {"Kamis, 5 Sep 2024"}
              </span>

              <div className="flex items-center">
                <GarudaIcon className="mr-3" />
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">
                      {"08:20 - 10:30"}
                    </span>
                    <span className="font-semibold text-xs">{"Direct"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-grey">
                      {"CGK T1A - SIN T1"}
                    </span>
                    <span className="text-xs text-grey">{"2h 10m"}</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] flex bg-dividerGrey" />
              <div className="flex-row flex flex-1 text-xs justify-between">
                <span className="text-grey">{"Jumlah Tiket"}</span>
                <span className="text-xs">{"1 Tiket"}</span>
              </div>
            </div>
          </Card>

          <span>{"Detail Pemesanan"}</span>
          <OrdererDetail />

          <Card className="mt-4">
            <div className="flex-1 grid gap-y-2">
              <div className="flex-row flex flex-1 text-xs justify-between items-center">
                <span className="text-sm font-semibold">
                  {"Kamis, 5 Sep 2024"}
                </span>
                <ChevronRight />
              </div>
              <div className="flex-row flex flex-1 text-xs justify-between items-center">
                <span className="text-xs text-grey">{"Penumpang 1"}</span>

                <div className="ml-auto">
                  <span className="text-xs">{"Tuan Abdul Hamdan"}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-center items-center bg-white p-4">
          <Button label="Lanjut" onClick={handleNavigateToOrderSummary} />
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
