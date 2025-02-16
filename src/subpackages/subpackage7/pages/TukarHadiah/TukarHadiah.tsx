import { DateStamp } from "../../../subpackage5/pages/CatatanIbadah/components";
import DaftarIbadah from "../../../subpackage5/pages/CatatanIbadah/components/DaftarIbadah";
import { View, Text, Image, Swiper, SwiperItem } from "@tarojs/components";
import StampIcon from "../../../../assets/icon-stamp-gamehub.svg";
import StampIcon32 from "../../../../assets/icon-stamp-gamehub-32.svg";
import ClockIcon from "../../../../assets/ico_clock.svg";
import useToggle from "../../../../hooks/useToggle";

import Button from "../../../../components/Button";
import BottomSheet from "../../../../components/BottomSheet";
import { useState } from "react";
import { useEffect } from "react";
import { handleNavigate } from "../../../../lib/utils";
import HorizontalStampCard from "../components/HorizontalStampCard/HorizontalStampCard";
import { useFetchListRewards, useFetchRewardSections } from "../../../../network/resolvers";
import { RewardSectionData, RewardItemData } from "../../../../network/types/response-props";
interface RewardItemProps {
  title: string;
  originalStamp: number;
  currentStamp: number;
  type: string;
  imageUrl: string;
  onClick: () => void;
}

const RewardItem: React.FC<RewardItemProps> = ({ title, originalStamp, currentStamp, type, imageUrl, onClick }) => {

  return (
    <div
      className="bg-white rounded-xl overflow-hidden mx-auto max-w-[165.5px] h-auto"
      style={{ border: '1px solid #EFF1F4' }}
    >
      <Image
        src={imageUrl}
        style={{
          width: "180px",
          height: "165px"
        }}
        mode="aspectFill"
      />
      <div className="p-3 pt-0">
        <div className="mb-2">
          <Text className="font-bold text-[12px] leading-[16px]">{title}</Text>
        </div>
        <div className="mb-3">
          <div className="flex gap-1 ml-[-2px]">
            <Image
              src={StampIcon}
              style={{
                width: "16px",
                height: "16px"
              }}
            />
            <span className="text-xs text-gray-400 line-through mr-2">
              {originalStamp} Stamp
            </span>
          </div>

          <span className="text-sm text-red-500 font-semibold">
            {currentStamp} Stamp
          </span>
        </div>
        <Button label="Tukar" onClick={onClick} className="!min-h-[34px] !max-h-[34px]" />
      </div>
    </div>
  );
};

const TukarHadiah = () => {
  const [currentSlides, setCurrentSlides] = useState<Record<string, number>>({});
  const [selectedReward, setSelectedReward] = useState<RewardItemData | null>(null);

  const { data: rewardSections, isLoading } = useFetchRewardSections();
  const { data: listRewards, isLoading: isLoadingListRewards } = useFetchListRewards(!!rewardSections?.data);
  // Group rewards by section and maintain section order
  const groupedRewards = ((rewardSections?.data?.data as unknown) as RewardSectionData[] || [])
    .sort((a, b) => Number(a.id) - Number(b.id))
    .reduce((acc, section) => {
      const sectionRewards = ((listRewards?.data?.data as unknown) as RewardItemData[] || []).filter(
        reward => reward.reward_section === section.name
      );
      acc[section.name] = sectionRewards;
      return acc;
    }, {} as Record<string, any>);

  const openReward = (reward: RewardItemData) => {
    setSelectedReward(reward);
  }

  const handleSwiperChange = (e, sectionName: string) => {
    setCurrentSlides(prev => ({
      ...prev,
      [sectionName]: e.detail.current
    }));
  };

  const handleCloseSheet = () => {
    setSelectedReward(null);
  };

  return (
    <View className="bg-[#D41F2C] w-full min-h-full h-auto">
      <View className="bg-white rounded-t-[16px] min-h-[100px]">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between">
            <div className="flex flex-col justify-between mb-6">
              <div className="flex items-center gap-1">
                <Image
                  src={StampIcon32}
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
          {((rewardSections?.data?.data as unknown) as RewardSectionData[] || []).map((section, idx) => (
            <View key={idx} className="mb-4">
              <p className="text-[16px] font-bold text-black mb-4">
                {section.name}
              </p>
              <Swiper
                className="w-full h-[305px] mb-4"
                circular
                autoplay
                displayMultipleItems={2}
                onChange={(e) => handleSwiperChange(e, section.name)}
              >
                {groupedRewards?.[section.name]?.map((item, idx) => (
                  <SwiperItem key={idx}>
                    <RewardItem
                      title={item.reward_name_id}
                      originalStamp={item.redeem_nominal}
                      currentStamp={item.redeem_nominal}
                      type={item.type}
                      imageUrl={item.image}
                      onClick={() => openReward(item)}
                    />
                  </SwiperItem>
                ))}
              </Swiper>
              {/* Dot Indicator */}
              <View className="flex justify-center">
                <View className="flex justify-center bg-[#00000040] rounded-2xl w-min mx-auto p-[2px]">
                  {groupedRewards?.[section.name]?.map((_, index) => (
                    <View
                      key={index}
                      className={`rounded-[10px] mx-1 transition-all duration-300 mr-[2px] ${(currentSlides[section.name] || 0) === index ? "bg-white w-4 h-1" : "bg-[#FFFFFF99] w-1 h-1"
                        }`}
                    ></View>
                  ))}
                </View>
              </View>
            </View>
          ))}

        </div>
      </View>

      <BottomSheet open={selectedReward !== null} onClose={handleCloseSheet} containerClassname={`p-4 ${selectedReward?.type !== 'voucher' ? 'h-[90vh]' : ''}`} withoutPadding>
        <View className="flex flex-col w-full">
          <p className="text-[16px] font-bold text-black mb-4 text-center">
            Mau tukar stamp dengan hadiah ini?
          </p>

          {selectedReward && (
            <div className="w-full">
              <HorizontalStampCard
                imageUrl={selectedReward.image}
                title={selectedReward.reward_name_id}
                originalStamps={selectedReward.redeem_nominal}
                discountedStamps={selectedReward.redeem_nominal}
              />
            </div>
          )}

          {selectedReward?.type === 'voucher' ? (
            <p className="text-sm text-grey mt-4 text-center">
              Tukarkan {selectedReward.redeem_nominal} stamp untuk mendapatkan hadiah ini sekarang!
            </p>
          ) : (
            <div>
              <p className="text-sm font-semibold mb-2">Deskripsi</p>
              <div className="w-full max-h-[30vh] bg-inactiveGrey overflow-y-auto rounded-lg mb-4">
                <p className="text-sm text-grey p-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ex eu lorem lacinia interdum a in mauris. Integer imperdiet congue metus nec scelerisque. Quisque eget tellus sed mi mattis consectetur. Proin felis mi, dignissim ac vehicula non, varius vel ante. Vivamus vel nibh sapien. Fusce lobortis mollis ipsum, quis dignissim ante tincidunt mollis.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ex eu lorem lacinia interdum a in mauris. Integer imperdiet congue metus nec scelerisque. Quisque eget tellus sed mi mattis consectetur. Proin felis mi, dignissim ac vehicula non, varius vel ante. Vivamus vel nibh sapien. Fusce lobortis mollis ipsum, quis dignissim ante tincidunt mollis.
                </p>
              </div>
            </div>
          )}
        </View>

        <Button label="Tukar Sekarang" onClick={handleCloseSheet} className="mb-1" />
        <Button
          label="Nanti Saja"
          onClick={handleCloseSheet}
          style="secondary"
        // className="mb-8"
        />
      </BottomSheet>
    </View>

  )

}



export default TukarHadiah;