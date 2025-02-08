import { DateStamp } from "../../../subpackage5/pages/CatatanIbadah/components";
import DaftarIbadah from "../../../subpackage5/pages/CatatanIbadah/components/DaftarIbadah";
import { View, Text, Image, Swiper, SwiperItem } from "@tarojs/components";
import StampIcon from "../../../../assets/icon-stamp-gamehub-32.svg";
import ClockIcon from "../../../../assets/ico_clock.svg";
import useToggle from "../../../../hooks/useToggle";

import Button from "../../../../components/Button";
import BottomSheet from "../../../../components/BottomSheet";
import { useState } from "react";
import { useEffect } from "react";
import { handleNavigate } from "../../../../lib/utils";
import HorizontalStampCard from "../components/HorizontalStampCard/HorizontalStampCard";

interface RewardItemProps {
  title: string;
  originalStamp: number;
  currentStamp: number;
  type: string;
  onClick: () => void;
}

const RewardItem: React.FC<RewardItemProps> = ({ title, originalStamp, currentStamp, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden mx-auto max-w-[165.5px]"
      style={{ border: '1px solid #EFF1F4' }}
    >
      <Image
        src={'https://placehold.co/400x400'}
        style={{
          width: "165.5px",
          height: "165px"
        }}
      />
      <div className="p-3">
        <Text className="font-bold text-[12px] leading-[16px]">{title}</Text>
        <div className="mb-3">
          <span className="text-xs text-gray-400 line-through mr-2">
            {originalStamp} Stamp
          </span>
          <span className="text-sm text-red-500 font-semibold">
            {currentStamp} Stamp
          </span>
        </div>
        <Button label="Tukar" onClick={onClick} className="!min-h-[34px] !max-h-[34px]" />
      </div>
    </div>
  );
};



const allRewards = [
  {
    title: 'Voucher Gopay 10 rb',
    originalStamp: 2500,
    currentStamp: 2000,
    type: 'voucher'
  },
  {
    title: 'Voucher Dana 10 rb',
    originalStamp: 2500,
    currentStamp: 2000,
    type: 'voucher'
  },
  {
    title: 'Voucher Gopay 20 rb',
    originalStamp: 2500,
    currentStamp: 2000,
    type: 'voucher'
  },
  {
    title: 'Voucher Dana 20 rb',
    originalStamp: 2500,
    currentStamp: 2000,
    type: 'voucher'
  }
];

const merchandises = [
  {
    title: 'Topi - Bucket Hat',
    originalStamp: 4200,
    currentStamp: 3300,
    type: 'merchandise'
  },
  {
    title: 'Eaphone Wireless',
    originalStamp: 16000,
    currentStamp: 13000,
    type: 'merchandise'
  }
];

const TukarHadiah = () => {
  const { active: visibleSheet, setActive: setVisibleSheet } = useToggle(false);
  const [selectedReward, setSelectedReward] = useState(null);

  useEffect(() => {
    if (selectedReward !== null) {
      setVisibleSheet(true);
    }
  }, [selectedReward]);

  const openReward = (index) => {
    setSelectedReward(index);
  }

  return (
    <View className="bg-[#D41F2C] w-full min-h-full h-auto">
      <View className="bg-white rounded-t-[16px] min-h-[100px]">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between">
            <div className="flex flex-col justify-between mb-6">
              <div className="flex items-center gap-1">
                <Image
                  src={StampIcon}
                  style={{
                    width: "32px",
                    height: "32px"
                  }}
                />
                <Text className="text-[20px] font-bold">3920</Text>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-grey">Berlaku sampai: <strong className="font-semibold">31 Maret 2025</strong></span>
              </div>
            </div>

            <div>
              <Button
                style="secondary"
                label="Riwayat"
                onClick={() => { handleNavigate('/subpackages/subpackage7/pages/RiwayatTukarHadiah/index') }}
                className="!max-h-[34px] !text-xs font-semibold leading-4"
                icon={<img src={ClockIcon} className="w-4 h-4 ml-[2px]" />}
              />
            </div>
          </div>

          {/* Rewards Sections */}
          <p className="text-[16px] font-bold text-black">
            Semua Hadiah
          </p>
          <Swiper
            className="w-full h-[365px]"
            indicatorColor='#999'
            indicatorActiveColor='#333'
            displayMultipleItems={2}
            circular
            indicatorDots
            autoplay
          >
            {allRewards.map((item, idx) => (
              <SwiperItem key={idx}>
                <RewardItem {...item} onClick={() => openReward(idx)} />
              </SwiperItem>
            ))}
          </Swiper>

          <p className="text-[16px] font-bold text-black">
            Merchandise
          </p>
          <Swiper
            className="w-full h-[365px]"
            indicatorColor='#999'
            indicatorActiveColor='#333'
            displayMultipleItems={2}
            circular
            indicatorDots
            autoplay
          >
            {merchandises.map((item, idx) => (
              <SwiperItem key={idx}>
                <RewardItem {...item} onClick={() => openReward(idx)}/>
              </SwiperItem>
            ))}
          </Swiper>
        </div>
      </View>

      <BottomSheet open={visibleSheet} onClose={() => { setVisibleSheet(false) }}>
        <View className="flex flex-col items-center text-center mb-4">
          <p className="text-[16px] font-bold text-black mb-4">
            Mau tukar stamp dengan hadiah ini?
          </p>

          <HorizontalStampCard
            imageUrl={'https://placehold.co/400x400'}
            title={'Voucher Gopay 11 rb'}
            originalStamps={2500}
            discountedStamps={2000}
          />

          <p className="text-sm text-grey mt-4">
            Tukarkan 2000 stamp untuk mendapatkan hadiah ini sekarang!
          </p>
        </View>

        <Button label="Selesai" onClick={() => { setVisibleSheet(false) }} className="mb-1" />
        <Button
          label="Tampilkan Lebih Banyak"
          onClick={() => setVisibleSheet(false)}
          style="secondary"
          className="mb-8"
        />
      </BottomSheet>
    </View>

  )

}



export default TukarHadiah;