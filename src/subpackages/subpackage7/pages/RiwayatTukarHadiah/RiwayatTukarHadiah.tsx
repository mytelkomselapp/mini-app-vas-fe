import { View, Text } from "@tarojs/components";
import HorizontalStampCard from "../components/HorizontalStampCard/HorizontalStampCard";
import useTaroNavBar from "../../../../hooks/useTaroNavBar";
import { handleNavigate } from "../../../../lib/utils";
import { useFetchRewardHistory } from "../../../../network/resolvers";
import { formatValidUntil } from "../../../../lib/utils";
import LoadingScreen from "../../../../components/LoadingScreen";
import Show from "../../../../components/Show";

const RiwayatTukarHadiah = () => {
  useTaroNavBar();

  const { data, isLoading } = useFetchRewardHistory();
  const histories = data?.data?.data?.histories ?? [];
  
  return (
    <View className="flex flex-col gap-4 p-4 min-h-screen">
      <Show when={isLoading}>
        <LoadingScreen text="Loading" customClassName="mx-[20px]" />
      </Show>
      {histories.length > 0 ? (
        histories.map((item, index) => (
          <HorizontalStampCard
            key={index}
            imageUrl={item.reward_image}
            title={item.reward_name}
            originalStamp={item.redeem_nominal}
            discountedStamp={item.redeem_nominal}
            expiredDate={item.voucher_detail?.tgl_expired ? formatValidUntil(item.voucher_detail.tgl_expired) : undefined}
            onClick={() => {
              handleNavigate("/subpackages/subpackage7/pages/DetailHadiah/index", undefined, { item });
            }}
            isHistory
          />
        ))
      ) : (
        !isLoading && (
          <View className="flex flex-col items-center justify-center flex-1">
            <Text className="text-center text-textSecondary">Tidak ada riwayat tukar hadiah</Text>
          </View>
        )
      )}
    </View>
  );
};

export default RiwayatTukarHadiah;
