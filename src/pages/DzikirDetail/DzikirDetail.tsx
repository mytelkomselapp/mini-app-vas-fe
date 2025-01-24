import { useEffect, useState } from "react";
import backdrop from "../../assets/backdrop-dzikir.png";
import Taro from "@tarojs/taro";
import ProgressBar from "./components/ProgressBar";
import { Text, View } from "@tarojs/components";
import BottomNavigation from "./components/BottomNavigation";

const DzikirDetail = () => {
  const [step, setStep] = useState(1);

  const totalSteps = 5; //total surah pages
  const searchParams = Taro.getCurrentInstance().router?.params;
  const period = searchParams?.period || "";
  const surahId = searchParams?.surahId || "";
  const caption = "Dibaca 1x";

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: `Dzikir ${period}` });
  }, [period]);

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
        <ProgressBar progress={1} max={24} />
        <View className="mt-3">
          <Text className="text-white font-batikSans font-semibold">
            {decodeURI(surahId)}
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
      <View className="p-4">
        <Text>{`Content ${step}`}</Text>
      </View>
      <BottomNavigation
        currentStep={step}
        totalSteps={totalSteps}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};

export default DzikirDetail;
