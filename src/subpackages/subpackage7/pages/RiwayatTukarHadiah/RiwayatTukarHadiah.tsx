import { View, Text } from "@tarojs/components";
import HorizontalStampCard from "../components/HorizontalStampCard/HorizontalStampCard";

type RewardStatus = 'standby' | 'pending' | 'failed' | 'success' | 'preview';

interface RewardHistoryItem {
  title: string;
  originalStamp: number;
  currentStamp: number;
  type: string;
  imageUrl: string;
  status: RewardStatus;
}

const historyData: RewardHistoryItem[] = [
  {
    title: 'Voucher Gopay 10 rb',
    originalStamp: 2500,
    currentStamp: 2000,
    type: 'voucher',
    imageUrl: 'https://placehold.co/400x400',
    status: 'standby'
  },
  {
    title: 'Voucher Gopay 10 rb',
    originalStamp: 2500,
    currentStamp: 2000,
    type: 'voucher',
    imageUrl: 'https://placehold.co/400x400',
    status: 'pending'
  },
  {
    title: 'Voucher Gopay 10 rb',
    originalStamp: 2500,
    currentStamp: 2000,
    type: 'voucher',
    imageUrl: 'https://placehold.co/400x400',
    status: 'failed'
  },
  {
    title: 'Voucher Gopay 10 rb',
    originalStamp: 2500,
    currentStamp: 2000,
    type: 'voucher',
    imageUrl: 'https://cdndev.mytsel.id/cmsbucket/5_Artboard_25_2x_13afb5e939_f173ccd5f5.png',
    status: 'success'
  }
]

const RiwayatTukarHadiah = () => {
  return <View className="flex flex-col gap-1 p-4">
    {historyData.map((item, index) => (
      <HorizontalStampCard
        key={index}
        imageUrl={item.imageUrl}
        title={item.title}
        originalStamps={item.originalStamp}
        discountedStamps={item.currentStamp}
        status={item.status}
      />
    ))}
  </View>
}

export default RiwayatTukarHadiah;