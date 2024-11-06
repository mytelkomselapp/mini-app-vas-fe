import React from "react";
import Plane from "../../assets/ico_plane_gray.svg";
import Garuda from "../../assets/garuda.svg";
const FlightTransactionDetail = () => {
  return (
    <div className="flex flex-col bg-white p-4 rounded-xl gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">14 SEP 2024</span>
        <div>
          <span className="text-sm text-textSecondary">KODE BOOKING</span>{" "}
          <span className="text-sm font-bold text-primaryRed">JNYCF12</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="w-24 flex flex-col">
            <span>T3 CGK</span>
            <span className="text-[10px] line-clamp-2">
              Soekarno-Hatta International Airport
            </span>
          </div>
          <img src={Plane} />
          <div className="w-24 flex flex-col items-end">
            <span>T3 CGK</span>
            <span className="text-[10px] text-right line-clamp-2">
              Soekarno-Hatta International Airport
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center py-1 px-2 bg-inactiveGrey rounded-2xl">
          <img src={Garuda} />
          <span className="text-[10px] font-bold">GA147</span>
        </div>
        <span className="text-[10px]">Direct</span>
        <span className="text-[10px]">1h 50m</span>
      </div>
    </div>
  );
};

export default FlightTransactionDetail;
