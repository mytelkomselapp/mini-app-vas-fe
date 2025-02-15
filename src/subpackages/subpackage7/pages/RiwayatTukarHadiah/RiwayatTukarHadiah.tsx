import { View, Text } from "@tarojs/components";
import HorizontalStampCard from "../components/HorizontalStampCard/HorizontalStampCard";


const historyData = [
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