import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import backdrop from "../../../../assets/backdrop-dzikir.png";
import morning from "../../../../assets/morning.svg";
import dawn from "../../../../assets/dawn.svg";
import { handleNavigate } from "../../../../lib/utils";
import { serializeParam } from "../../../../core/serializeParam";
import Taro from "@tarojs/taro";
import { useFetchDzikir } from "../../../../network";
import { DzikirCMSData } from "../../../../network/types/response-props";
import { useDzikirDetail } from "../../../../store/ramadhan";

interface Surah {
  period: string;
  surahId: string;
}

const Dzikir = () => {
  const { data: dataRawDzikir, isLoading } = useFetchDzikir();
  const { setData } = useDzikirDetail();
  const dataDzikir = dataRawDzikir?.data?.data;
  const dzikirPagi =
    dataDzikir?.filter((item) => item?.category === "pagi") ?? [];
  const dzikirMalam =
    dataDzikir?.filter((item) => item?.category === "malam") ?? [];
  const [activeTab, setActiveTab] = useState("pagi");

  const dhikrList = activeTab === "pagi" ? dzikirPagi : dzikirMalam;

  const handleClick = (origin: DzikirCMSData) => {
    const qParams = serializeParam(origin);
    handleNavigate(
      "/subpackages/subpackage4/pages/DzikirDetail/index",
      `?${qParams}`
    );
  };

  useEffect(() => {
    if (dataRawDzikir && dataDzikir) {
      setData(dataDzikir);
    }
  }, [dataRawDzikir]);

  return (
    <div className="max-w-md mx-auto overflow-hidden ">
      <div
        className="p-4 rounded-b-2xl fixed top-0 left-0 right-0 z-10"
        style={{
          background: `url(${backdrop})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex p-2 rounded-3xl bg-[#0D0D0D66]">
          <button
            className={`flex-1 py-1 text-center border-none rounded-3xl text-white items-center flex justify-center text-[14px] font-semibold gap-2 ${
              activeTab === "pagi" ? "bg-textError" : "bg-transparent"
            }`}
            onClick={() => {
              setActiveTab("pagi");
              Taro.pageScrollTo({ scrollTop: 0, duration: 300 });
            }}
          >
            <img src={morning} alt="morning" className="w-6 h-6" /> Pagi
          </button>
          <button
            className={`flex-1 py-1 text-center border-none rounded-3xl text-white items-center flex justify-center text-[14px] font-semibold gap-2  ${
              activeTab === "petang" ? "bg-textError" : "bg-transparent"
            }`}
            onClick={() => {
              setActiveTab("petang");
              Taro.pageScrollTo({ scrollTop: 0, duration: 300 });
            }}
          >
            <img src={dawn} alt="dawn" className="w-6 h-6" /> Petang
          </button>
        </div>
      </div>
      <div className="pt-20">
        <ul className="divide-y divide-gray-200 bg-white h-full pt-2">
          {dhikrList.map((item, index) => (
            <View key={index} onClick={() => handleClick(item)}>
              <li className="py-4 px-6 flex items-center ">
                <span className="w-6 h-6 flex items-center justify-center bg-[#FEF2F4] text-textError text-[14px] font-bold font-batikSans rounded-lg mr-4 p-1">
                  {index + 1}
                </span>
                <span className="text-[14px]">{item?.title}</span>
              </li>
              {index !== dhikrList?.length - 1 ? (
                <div className="w-10/12 h-[1px] bg-inactiveGrey rounded mx-auto" />
              ) : null}
            </View>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dzikir;
