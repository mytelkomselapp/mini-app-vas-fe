import { View } from "@tarojs/components";
import HorizontalStampCard from "../components/HorizontalStampCard/HorizontalStampCard";
import useTaroNavBar from "../../../../hooks/useTaroNavBar";
import { formatDateToIndonesian, handleNavigate } from "../../../../lib/utils";
import { useFetchRewardHistory } from "../../../../network/resolvers";

const formatValidUntil = (date: string | Date) => {
  const formattedDate = formatDateToIndonesian(new Date(date));
  return `${formattedDate.day} ${formattedDate.monthName} ${formattedDate.year}`;
};

const RiwayatTukarHadiah = () => {
  useTaroNavBar();

  const { data, isLoading } = useFetchRewardHistory();
  console.log(data);

  return (
    <View className="flex flex-col gap-1 p-4">
      {data?.data?.data?.histories?.map((item, index) => (
        <HorizontalStampCard
          key={index}
          imageUrl={item.reward_image}
          title={item.reward_name}
          originalStamps={item.redeem_nominal}
          discountedStamps={item.redeem_nominal}
          expiredDate={item.voucher_detail?.tgl_expired ? formatValidUntil(item.voucher_detail.tgl_expired) : undefined}
          onClick={() => {
            handleNavigate("/subpackages/subpackage7/pages/DetailHadiah/index", undefined, { item });
          }}
        />
      ))}
    </View>
  );
};

export default RiwayatTukarHadiah;
