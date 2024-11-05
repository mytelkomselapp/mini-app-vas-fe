import Navbar from "../../components/Navbar";
import EmptyBox from "../../assets/empty-box.svg";
import Transaction from "../../assets/ico_transaction_red.svg";
import ChevronRight from "../../assets/chevron-right.svg";
import ArrowRight from "../../assets/arrow-right.svg";
import Plane from "../../assets/plane-red.svg";
import TrackFlight from "../../assets/track-flight.svg";
import { COMMERCE_TRAVEL } from "../../App";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import React from "react";
import Show from "../../components/Show";
import RenderVerticalList from "../../components/RenderVerticalList/RenderVerticalList";
import { cn } from "../../lib/utils";

interface ActivityCard {
  label: string;
  transactionType: "flight" | "trackFlight";
}

const activityList: ActivityCard[] = [
  {
    label: "Tiket Pesawat",
    transactionType: "flight",
  },
  {
    label: "Pantau Penerbangan",
    transactionType: "trackFlight",
  },
  {
    label: "Tiket Pesawat",
    transactionType: "flight",
  },
  {
    label: "Pantau Penerbangan",
    transactionType: "trackFlight",
  },
  {
    label: "Tiket Pesawat",
    transactionType: "flight",
  },
  {
    label: "Pantau Penerbangan",
    transactionType: "trackFlight",
  },
];

const MyActivity = () => {
  const [activityData, setHistoryData] = React.useState<ActivityCard[]>([]);
  const navigate = useNavigate();

  const handleTrackFlight = () => {
    navigate(`/flight`);
  };

  const handleNavigateTravel = () => {
    navigate(`${COMMERCE_TRAVEL}`);
  };

  const handleNavigateHistoryActivity = () => {
    navigate(`${COMMERCE_TRAVEL}/history-activity`);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-inactiveGrey">
      <div className="px-4 mb-4 bg-white">
        <img src={Navbar} />
      </div>
      <div className="px-4 pb-4">
        <span className="text-xl">Aktivitas Saya</span>
      </div>
      <Show
        when={activityData?.length > 0}
        fallbackComponent={
          <>
            <div
              className="flex flex-col items-center justify-center text-center py-6 px-4 gap-3"
              onClick={() => setHistoryData(activityList)}
            >
              <img src={EmptyBox} />
              <span className="text-base font-semibold font-sans mt-1">
                Belum ada aktifitas aktif
              </span>
              <span className="text-xs font-normal font-sans my-1 sm:px-2 md:px-4 lg:px-6">
                Daftar tiket pesawat, penginapan, atraksi, dan pantau
                penerbangan akan ditampilkan di sini
              </span>
            </div>
            <div className="flex px-4 flex-col gap-3 py-6">
              <Button
                onClick={handleNavigateTravel}
                label="Cari Destinasi Perjalanan"
              />
              <Button
                onClick={handleTrackFlight}
                label="Pantau Penerbangan"
                style="secondary"
                className="bg-transparent"
              />
            </div>
            <div className="px-4 pb-8">
              <div
                className="flex bg-white items-center justify-between p-4 rounded-xl"
                onClick={handleNavigateHistoryActivity}
              >
                <div className="flex items-center gap-2">
                  <img src={Transaction} />
                  <span className="text-sm">Pembelian Kamu</span>
                </div>
                <img src={ChevronRight} />
              </div>
            </div>
          </>
        }
      >
        <RenderVerticalList data={activityData} keyIndex="id" pageSize={10}>
          {(data: ActivityCard, index) => (
            <div
              className={cn("px-4", {
                "pb-[8px]": index === 0,
                "py-[8px]": index > 0,
              })}
            >
              <div className="flex flex-col gap-2 bg-white p-4 rounded-xl">
                <div className="flex items-center gap-2 text-xs">
                  {data?.transactionType === "flight" ? (
                    <Plane width={24} height={24} viewBox="0 0 32 32" />
                  ) : (
                    <TrackFlight width={24} height={24} />
                  )}

                  <span className="text-xs">{data?.label}</span>
                </div>
                <div className="flex text-sm gap-2">
                  <span>Jakarta (CGK)</span>
                  <img src={ArrowRight} />
                  <span>Singapura (SIN)</span>
                </div>
                <div className="text-sm">
                  <span>14 Sep 2024, </span>
                  <span>18:00</span>
                </div>
              </div>
            </div>
          )}
        </RenderVerticalList>
        <div className="mt-auto px-4 p-4">
          <div
            className="flex bg-white items-center justify-between p-4 rounded-xl"
            onClick={handleNavigateHistoryActivity}
          >
            <div className="flex items-center gap-2">
              <img src={Transaction} />
              <span className="text-sm">Riwayat Pembelian Kamu</span>
            </div>
            <img src={ChevronRight} />
          </div>
        </div>
      </Show>
    </div>
  );
};

export default MyActivity;
