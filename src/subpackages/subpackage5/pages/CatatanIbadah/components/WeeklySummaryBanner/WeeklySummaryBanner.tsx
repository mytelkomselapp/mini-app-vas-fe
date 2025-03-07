import { Image, View } from "@tarojs/components";
import CalRamadhan from "../../../../../../assets/cal_ramadan.png";
import useWeeklyBannerSummary from "../../../../../../hooks/useWeeklyBannerSummary";
import { handleNavigate } from "../../../../../../lib/utils";

const WeeklySummaryBanner = () => {
  const { visible } = useWeeklyBannerSummary();

  const handleToWeeklySummary = () => {
    /** TODO: uncomment when testing n development finished */
    // if (!visible) return;

    handleNavigate("/subpackages/subpackage5/pages/WeeklySummary/index");
  };

  return (
    <View
      style={{
        background: `radial-gradient(circle at top left, #FB952B 0%, transparent 50%),
               linear-gradient(to right, #960B70, #E30051, #ED0226)`,
      }}
      className="rounded-[16px] w-full mb-4 relative"
    >
      <View className="flex flex-col gap-y-2 w-[80%] overflow-hidden p-[16px] h-full">
        <p className="text-[14px] text-white font-bold">
          Ayo cek rekap minggu ke-1 mu!
        </p>
        {/* TODO: Remove this component when testing n development finished */}
        <div
          onClick={handleToWeeklySummary}
          className={`bg-white text-[#ed0226] text-[12px] font-semibold py-[8px] px-[16px] cursor-pointer rounded-[40px] w-[max-content]`}
        >
          Lihat Di sini
        </div>
        {/* TODO: Remove this component when testing n development finished */}
        {/* <div
          onClick={handleToWeeklySummary}
          className={`${
            visible ? "bg-white text-[#ed0226]" : "bg-[#dae0e9] text-[#9ca9b9]"
          } text-[12px] font-semibold py-[8px] px-[16px] cursor-pointer rounded-[40px] w-[max-content]`}
        >
          {visible ? "Lihat Di sini" : "Belum Tersedia"}
        </div> */}
      </View>
      <Image
        src={CalRamadhan}
        mode="aspectFit"
        className="absolute right-0 bottom-0 top-0 w-[100px] h-[100px]"
      />
    </View>
  );
};

export default WeeklySummaryBanner;
