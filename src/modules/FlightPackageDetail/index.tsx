import React from "react";
import IcoPlane from "../../assets/ico_plane.svg";
import IcoLove from "../../assets/ico_love.svg";
import IcoTime from "../../assets/ico_time.svg";
import Divider from "../../assets/divider.svg";
import { FlightFreemiumPackageData } from "../../network/types/response-props";
import Show from "../../components/Show";

interface FlightPackage {
  data?: FlightFreemiumPackageData;
}

const FlightPackageDetail: React.FC<FlightPackage> = ({ data }) => {
  return (
    <>
      <div>
        <p className="text-sm">{data?.name}</p>
      </div>
      <div className="flex justify-between mb-8">
        <Show when={data?.package_type === "quota"}>
          <p className="text-xl">
            {data?.name.split(" ").slice(0, 2).join(" ")}
          </p>
        </Show>
        <Show when={data?.package_type === "unlimited"}>
          <p className="text-xl">
            Unlimited | {String(data?.validity_day)} Hari
          </p>
        </Show>
        <p className="text-xl">
          {"Rp" + parseFloat(String(data?.price))?.toLocaleString("id") || "0"}
        </p>
      </div>
      <div className="bg-white px-4 py-5 rounded-2xl">
        <div className="flex gap-2">
          <div>
            <img src={IcoLove} className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-sm text-blueNavy">Lacak Penerbangan</p>
            <p className="text-xs">
              Lacak lewat rute dan ID pesawat tanpa batas
            </p>
          </div>
        </div>
        <div className="py-3">
          <img src={Divider} className="h-[1px]" />
        </div>
        <div className="flex gap-2">
          <div>
            <img src={IcoPlane} className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-sm text-blueNavy">
              Detail Penerbangan Lengkap
            </p>
            <p className="text-xs">
              Detail bagasi, pintu check in, boarding gate dan arrival gate
            </p>
          </div>
        </div>
        <div className="py-3">
          <img src={Divider} className="h-[1px]" />
        </div>
        <div className="flex gap-2">
          <div>
            <img src={IcoTime} className="w-6 h-6" />
          </div>
          <div>
            <Show when={data?.package_type === "quota"}>
              <p className="font-bold text-sm text-blueNavy">
                {data?.name.split(" ").slice(0, 2).join(" ")}
              </p>
              <p className="text-xs">
                Hanya {String(data?.quota)}x penggunaan setelah paket aktif
              </p>
            </Show>
            <Show when={data?.package_type === "unlimited"}>
              <p className="font-bold text-sm text-blueNavy">Unlimited</p>
              <p className="text-xs">
                Penggunaan fitur tanpa batasan dalam 30 hari paket aktif
              </p>
            </Show>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightPackageDetail;
