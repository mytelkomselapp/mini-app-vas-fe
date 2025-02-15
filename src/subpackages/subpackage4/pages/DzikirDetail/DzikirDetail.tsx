import { useEffect, useState } from "react";
import backdrop from "../../../../assets/backdrop-dzikir.png";
import Taro from "@tarojs/taro";
import ProgressBar from "./components/ProgressBar";
import { Text, View } from "@tarojs/components";
import BottomNavigation from "./components/BottomNavigation";
import { useDzikirDetail } from "../../../../store/ramadhan";
import { DzikirCMSData } from "@/network/types/response-props";

const DzikirDetail = () => {
  const { data: dataDzikirList } = useDzikirDetail();

  const [step, setStep] = useState(1); //ayat
  const [readTimes, setReadTimes] = useState(1);
  const [dataDzikirDetail, setDataDzikirDetail] = useState({});

  const searchParams = Taro.getCurrentInstance().router?.params;

  const period = searchParams?.period || "";

  const category = searchParams?.category || "";
  const order = searchParams?.order || 0;

  const dataDzikir = dataDzikirList?.find(
    (val) => val.category === category && String(val?.order) === String(step)
  );

  const totalSteps =
    dataDzikirList?.filter((val) => val?.category === category)?.length || 1; //total surah pages
  const arab = decodeURIComponent(dataDzikir?.arab || "");
  const indonesia = decodeURIComponent(dataDzikir?.indonesia || "");
  const latin = decodeURIComponent(dataDzikir?.latin || "");
  const title = decodeURIComponent(dataDzikir?.title || "");
  const readTotal = dataDzikir?.readCount || 1;
  const caption = `Dibaca ${readTotal}x`;
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: `Dzikir ${category}` });
    setStep(readTotal);
  }, [period, order]);
  useEffect(() => {
    if (dataDzikir) {
      setDataDzikirDetail(dataDzikir as DzikirCMSData);
      setReadTimes(dataDzikir?.readCount || 1);
    }
  }, [dataDzikir]);
  const handlePrevious = () => {
    if (readTimes < readTotal) {
      setReadTimes(readTimes + 1);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };
  console.log({ readTimes, readTotal });

  const handleNext = () => {
    if (readTimes > 1) {
      setReadTimes(readTimes - 1);
    } else if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  return (
    <div className="max-w-md mx-auto overflow-hidden ">
      <div
        className="p-4"
        style={{
          background: `url(${backdrop})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* {period + " " + surahId} */}
        <ProgressBar progress={step} max={totalSteps} />
        <View className="mt-3">
          <Text className="text-white font-batikSans font-semibold">
            {title}
          </Text>
        </View>
        <View>
          <Text className="text-white text-xs">{caption}</Text>
        </View>
        {/* <div className="flex p-2 rounded-3xl bg-[#0D0D0D66]">
          <button
            className={`flex-1 py-1 text-center border-none rounded-3xl text-white items-center flex justify-center text-[14px] font-semibold gap-2 ${
              activeTab === "pagi" ? "bg-textError" : "bg-transparent"
            }`}
            onClick={() => setActiveTab("pagi")}
          >
            <img src={morning} alt="morning" className="w-6 h-6" /> Pagi
          </button>
          <button
            className={`flex-1 py-1 text-center border-none rounded-3xl text-white items-center flex justify-center text-[14px] font-semibold gap-2  ${
              activeTab === "petang" ? "bg-textError" : "bg-transparent"
            }`}
            onClick={() => setActiveTab("petang")}
          >
            <img src={dawn} alt="dawn" className="w-6 h-6" /> Petang
          </button>
        </div> */}
      </div>
      <View className="p-6 justify-end text-right">
        <Text className="text-right text-xl leading-[2.5]">{arab}</Text>
      </View>
      <View className="px-4 leading-tight">
        <Text className="text-grey text-[14px]">{latin}</Text>
      </View>
      <View className="px-4 flex flex-col mt-4">
        <Text className="font-bold font-batikSans text-base">Artinya</Text>
        <Text className="text-[14px] pt-2 mb-40">{indonesia}</Text>
      </View>
      <BottomNavigation
        currentStep={step}
        totalSteps={totalSteps}
        readTimes={readTimes}
        readTotal={readTotal}
        onPrevious={() => handlePrevious()}
        onNext={() => handleNext()}
      />
    </div>
  );
};

export default DzikirDetail;
