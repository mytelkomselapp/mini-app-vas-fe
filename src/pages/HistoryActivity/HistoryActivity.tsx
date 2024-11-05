import Navbar from "../../components/Navbar";
import EmptyBox from "../../assets/empty-box.svg";
import Show from "../../components/Show";
import React from "react";
import RenderVerticalList from "../../components/RenderVerticalList/RenderVerticalList";
import { cn } from "../../lib/utils";
import Plane from "../../assets/plane-red.svg";
import Hotel from "../../assets/hotel.svg";
import Carnaval from "../../assets/carnaval.svg";
import { useNavigate } from "react-router-dom";
import { COMMERCE_TRAVEL } from "../../App";

interface TransactionCard {
  label: string;
  transactionId: string;
  transactionType: "flight" | "hotel" | "atraksi";
  price: string;
}

const transactionList: TransactionCard[] = [
  {
    label: "Jakarta (CGK)",
    transactionId: "947392",
    transactionType: "flight",
    price: "Rp1.989.000",
  },
  {
    label: "Brits Legion Hotel Singapore",
    transactionId: "942731",
    transactionType: "hotel",
    price: "Rp1.389.000",
  },
  {
    label: "Ragunan Zoo",
    transactionId: "942714",
    transactionType: "atraksi",
    price: "Rp389.000",
  },
];

const HistoryActivity = () => {
  const [transactionData, setTransactionData] = React.useState<
    TransactionCard[]
  >([]);

  const navigate = useNavigate();
  const handleNavigateTransactionDetail = (
    transactionType: string,
    transactionId: string
  ) => {
    navigate(
      `${COMMERCE_TRAVEL}/history-activity/${transactionType}/${transactionId}`
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-inactiveGrey">
      <div className="px-4 mb-4 bg-white">
        <Navbar />
      </div>
      <Show
        when={transactionData?.length > 0}
        fallbackComponent={
          <>
            <div className="px-4 pb-4">
              <span className="text-base">Riwayat Pembelian Kamu</span>
            </div>
            <div
              className="flex flex-col items-center justify-center text-center px-4 gap-3"
              onClick={() => setTransactionData(transactionList)}
            >
              <img src={EmptyBox} />
              <span className="text-base font-semibold font-sans mt-1">
                Kamu belum pernah bertransaksi
              </span>
              <span className="text-xs font-normal font-sans my-1">
                Daftar transaksi terdahulu akan ditampilkan di sini
              </span>
            </div>
          </>
        }
      >
        <div className="px-4 pb-4">
          <span className="text-base">Pembelian Kamu</span>
        </div>
        <RenderVerticalList data={transactionData} keyIndex="id" pageSize={10}>
          {(data: TransactionCard, index) => (
            <div
              className={cn("px-4", {
                "pb-[8px]": index === 0,
                "py-[8px]": index > 0,
              })}
            >
              <div
                className="flex flex-col gap-2 bg-white p-4 rounded-xl"
                onClick={() =>
                  handleNavigateTransactionDetail(
                    data?.transactionType,
                    data?.transactionId
                  )
                }
              >
                <div className="flex items-center gap-2 text-xs">
                  {data?.transactionType === "flight" ? (
                    <Plane width={24} height={24} viewBox="0 0 32 32" />
                  ) : data?.transactionType === "atraksi" ? (
                    <Carnaval width={24} height={24} />
                  ) : (
                    <Hotel width={24} height={24} />
                  )}
                  <span>{data?.label}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <span className="text-sm">ID Pesanan</span>
                    <span className="text-sm">{data?.transactionId}</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold">{data?.price}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </RenderVerticalList>
      </Show>
    </div>
  );
};

export default HistoryActivity;
