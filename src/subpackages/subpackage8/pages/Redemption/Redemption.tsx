import React from "react";
import ticketCropped from "../../../../assets/ticket-cropped-pattern.png";
import strokeGrey from "../../../../assets/stroke-grey.svg";
import successIcon from "../../../../assets/success-radial.png";
import failedIcon from "../../../../assets/failed-radial.png";
import iconStamp from "../../../../assets/icon-stamp-gamehub-32.svg";
import iconInfo from "../../../../assets/ico_info.svg";
import { View } from "@tarojs/components";
import Button from "../../../../components/Button";
import { formatDateToIndonesian, getTimezone, handleNavigate } from "../../../../lib/utils";
import Taro from "@tarojs/taro";

const Redemption: React.FC = () => {
  const getStats = (stats: string) => {
    if (stats === "success") {
      return {
        image: successIcon,
        title: "Penukaran Berhasil",
        status: "Berhasil",
        color: "text-successGreen",
      };
    } else {
      return {
        image: failedIcon,
        title: "Penukaran Gagal",
        status: "Gagal",
        color: "text-[#B90024]",
      };
    }
  };
  const searchParams = Taro.getCurrentInstance().router?.params;

  const resultStatus = searchParams?.status || ""; 
  const stampAmount = searchParams?.stampAmount || "";

  const currentDate = new Date();
  const time = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')} ${getTimezone()}`;
  const formattedDate = formatDateToIndonesian(new Date());
  const finalDate = `${formattedDate.day} ${formattedDate.monthName}, ${formattedDate.year}`;

  const handleOpenHistory = () => {
    handleNavigate("/subpackages/subpackage7/pages/RiwayatTukarHadiah/index");
  };
  const { image, title, status, color } = getStats(resultStatus);
  return (
    <div className="bg-inactiveGrey p-4 pb-10 h-screen">
      <div className="mt-4 h-[50vh]">
        <img src={ticketCropped} className="w-full h-[26px]" />
        <div className="flex flex-col items-center bg-white -mt-2 pt-0 ">
          <img src={image} className="w-16 h-16" />

          <h2 className={`font-semibold text-base my-3 font-sans ${color}`}>
            {title}
          </h2>
        </div>

        <div className="relative w-full bg-white py-2">
          {/* Left Notch */}
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-inactiveGrey rounded-full border border-gray-300 z-20"></div>
          <img
            src={strokeGrey}
            className="w-full h-1 absolute top-[100%] transform -translate-y-1/2"
            alt="Dashed Line"
          />
          {/* Right Notch */}
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-inactiveGrey rounded-full border border-gray-300 z-20"></div>
        </div>

        <div className="bg-white px-4 text-[14px] h-[70vh] pt-6">
          <div className=" font-medium text-[14px]">Rincian Penukaran</div>

          <div className="mt-2 space-y-2">
            <div className="flex justify-between text-grey">
              <span>Status</span>
              <span className={`${color} font-medium`}>{status}</span>
            </div>
            <div className="flex justify-between text-grey">
              <span>Waktu</span>
              <span>{time}</span>
            </div>
            <div className="flex justify-between text-grey !mb-4">
              <span>Tanggal</span>
              <span>{finalDate}</span>
            </div>
            <View className="h-[1px] bg-dividerGrey w-full mr-2" />
            <div className="flex justify-between text-grey !mt-4">
              <span>Jumlah</span>
              <div className="justify-end flex items-center">
                <img src={iconStamp} className="w-4 h-4 mr-2" />
                <span className="text-solidRed font-semibold">{stampAmount} Stamp</span>
              </div>
            </div>
          </div>

          {status === "Berhasil" ? (
            <div className="bg-[#479CFF26]  p-4 rounded-lg mt-4 text-xs flex items-center">
              <img src={iconInfo} className="w-4 h-4 mr-2" />
              Kamu bisa cek nomor resi pengiriman melalui halaman riwayat.
            </div>
          ) : (
            <></>
          )}

          <Button
            label="Buka Riwayat"
            onClick={handleOpenHistory}
            className="border-0 font-semibold mt-4"
          />
        </div>
        <img
          src={ticketCropped}
          className="w-full h-[26px]"
          style={{ transform: "rotate(180deg)" }}
        />
      </div>
    </div>
  );
};

export default Redemption;
