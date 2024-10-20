import Navbar from "../../components/Navbar";
import FlightTransactionDetail from "./components/FlightTransactionDetail";
import { ReactComponent as Voucher } from "../../assets/voucher.svg";
import { ReactComponent as ChevronRight } from "../../assets/chevron-right.svg";
import { useParams } from "react-router-dom";
import Show from "../../components/Show";

const HistoryTransactionDetail = () => {
  const params = useParams<{
    transaction_type: string;
    transaction_id: string;
  }>();
  console.log(params);
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-inactiveGrey">
      <div className="px-4 mb-4 bg-white">
        <Navbar />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col bg-white p-4 rounded-xl gap-4">
          <span>Informasi Terkini</span>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-xs">Tanggal Beli</span>
              <span className="text-xs">5 Agt 2024, 13.23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">Harga</span>
              <span className="text-xs">Rp1.989.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">Beli dari</span>
              <span className="text-xs">Traveloka</span>
            </div>
          </div>
        </div>
        <Show when={params.transaction_type === "flight"}>
          <FlightTransactionDetail />
          <div className="flex items-center justify-between bg-white p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Voucher />
              <span className="text-sm">Lihat E-Voucher</span>
            </div>
            <ChevronRight />
          </div>
        </Show>
      </div>
    </div>
  );
};

export default HistoryTransactionDetail;
