import { View, Text, Image, Swiper, SwiperItem } from "@tarojs/components";
import StampIcon from "../../../../assets/icon-stamp-gamehub.svg";
import StampIcon32 from "../../../../assets/icon-stamp-gamehub-32.svg";
import ClockIcon from "../../../../assets/ico_clock.svg";

import Button from "../../../../components/Button";
import BottomSheet from "../../../../components/BottomSheet";
import { useState } from "react";
import { formatValidUntil, handleNavigate } from "../../../../lib/utils";
import HorizontalStampCard from "../components/HorizontalStampCard/HorizontalStampCard";
import {
  useFetchListRewards,
  useFetchRewardSections,
  useFetchUserStamp,
  usePostRedeemVoucher,
} from "../../../../network/resolvers";
import {
  RewardSectionData,
  RewardItemData,
} from "../../../../network/types/response-props";
import { useCurrentSelectedReward } from "../../../../store/ramadhan";
import useTaroNavBar from "../../../../hooks/useTaroNavBar";
import Taro from "@tarojs/taro";
import NotificationToast from "../../../../components/NotificationToast";
import useToggle from "../../../../hooks/useToggle";
import LoadingScreen from "../../../../components/LoadingScreen";
import Show from "../../../../components/Show";
import Glitter from "../../../../assets/glitter.png";

interface RewardItemProps {
  title: string;
  originalStamp: number;
  currentStamp: number;
  type: string;
  imageUrl: string;
  onClick: () => void;
  disabled?: boolean;
}

const RewardItem: React.FC<RewardItemProps> = ({
  title,
  originalStamp,
  currentStamp,
  type,
  imageUrl,
  onClick,
  disabled,
}) => {
  useTaroNavBar();
  return (
    <div
      className="bg-white rounded-xl overflow-hidden mx-auto max-w-[165.5px] h-auto"
      style={{ border: "1px solid #EFF1F4" }}
    >
      <Image
        src={imageUrl}
        style={{
          width: "180px",
          height: "165px",
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
                height: "16px",
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
        <Button
          label="Tukar"
          onClick={onClick}
          className="!min-h-[34px] !max-h-[34px]"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

const TukarHadiah = () => {
  const { active: visibleNotificationToast, toggleActive: toggleVisibleNotificationToast } = useToggle();

  const [currentSlides, setCurrentSlides] = useState<Record<string, number>>(
    {}
  );
  const { data: dataUserStampRaw } = useFetchUserStamp();
  const dataUserStamp = dataUserStampRaw?.data?.data;
  const totalStamp = dataUserStamp?.total_stamp ?? 0;
  const validUntil = dataUserStamp?.valid_until ?? "";

  const finalValidUntil = validUntil ? formatValidUntil(validUntil) : '-';

  const { currentSelectedReward, setCurrentSelectedReward } =
    useCurrentSelectedReward();
  const { data: rewardSections, isLoading: isLoadingRewardSections } = useFetchRewardSections();
  const filteredRewardSections = rewardSections?.data?.data?.filter(
    (section) => section.name.toLowerCase() !== 'merchandise'
  );

  const { data: listRewards, isLoading: isLoadingListRewards } =
    useFetchListRewards(!!rewardSections?.data);
  // Group rewards by section and maintain section order
  const groupedRewards = (
    (rewardSections?.data?.data as unknown as RewardSectionData[]) || []
  )
    .sort((a, b) => Number(a.id) - Number(b.id))
    .reduce((acc, section) => {
      const sectionRewards = (
        (listRewards?.data?.data as unknown as RewardItemData[]) || []
      ).filter((reward) => reward.reward_section === section.name);
      acc[section.name] = sectionRewards;
      return acc;
    }, {} as Record<string, any>);

  const { mutateAsync: redeemVoucher, isLoading: isLoadingRedeemVoucher } = usePostRedeemVoucher(dataUserStamp?.user_id ?? '');

  const openReward = (reward: RewardItemData) => {
    setCurrentSelectedReward(reward);
  };

  const handleSwiperChange = (e, sectionName: string) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [sectionName]: e.detail.current,
    }));
  };

  const handleCloseSheet = () => {
    setCurrentSelectedReward(null);
  };

  const handleCheckout = async () => {
    const id = currentSelectedReward?.id;
    if (!id) return;
    const result = await redeemVoucher({ reward_id: id });
    if (result?.data?.meta?.status?.toLowerCase() === "success") {
      Taro.navigateTo({
        url:
          "/subpackages/subpackage9/pages/Webview/index?url=" +
          encodeURIComponent(
            result?.data?.data?.redeem_result?.voucher?.data?.url
          ),
      });
    } else {
      // setCurrentSelectedReward(null);
      toggleVisibleNotificationToast();
    }
  };

  return (
    <View className="bg-[#D41F2C] w-full min-h-full h-auto">
      <Show when={isLoadingRewardSections || isLoadingListRewards}>
        <LoadingScreen text="Loading" customClassName="mx-[20px]" />
      </Show>
      <View className="bg-white rounded-t-[16px] min-h-[100px]">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between">
            <div className="relative flex flex-col justify-between mb-6">
              <Image 
                src={Glitter} 
                style={{ 
                  width: "220px", 
                  height: "220px",
                  position: "absolute",
                  top: "-20px",
                  left: "0",
                  pointerEvents: "none",
                  transform: "rotate(-14deg)",
                  zIndex: 1,
                }} 
              />
              <div className="flex items-center mb-2">
                <Image
                  src={StampIcon32}
                  style={{
                    width: "32px",
                    height: "32px",
                  }}
                />
                <Text className="text-[20px] font-bold">{totalStamp}</Text>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-grey">
                  Berlaku sampai:{" "}
                  <strong className="font-semibold">{finalValidUntil || '-'}</strong>
                </span>
              </div>
            </div>

            <div>
              <Button
                style="secondary"
                label="Riwayat"
                onClick={() => {
                  handleNavigate(
                    "/subpackages/subpackage7/pages/RiwayatTukarHadiah/index"
                  );
                }}
                className="!text-xs font-semibold leading-[16px] !min-h-[34px] !max-h-[34px]"
                icon={<img src={ClockIcon} className="w-4 h-4 ml-[2px]" />}
              />
            </div>
          </div>

          {/* Rewards Sections */}
          {(
            (filteredRewardSections as unknown as RewardSectionData[]) || []
          ).map((section, idx) => (
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
                      disabled={item.redeem_nominal > totalStamp}
                    />
                  </SwiperItem>
                ))}
              </Swiper>
              {/* Dot Indicator */}
              {groupedRewards?.[section.name]?.length > 2 && (
                <View className="flex justify-center">
                  <View className="flex justify-center rounded-2xl w-min mx-auto p-[2px]">
                    {groupedRewards?.[section.name]?.map((_, index) => (
                      <View
                        key={index}
                        className={`rounded-[10px] mx-1 transition-all duration-300 mr-[2px] ${
                          (currentSlides[section.name] || 0) === index
                            ? "bg-[#001A41] w-4 h-1"
                            : "bg-[#001A41] w-1 h-1"
                        }`}
                      ></View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
        </div>
      </View>

      <BottomSheet
        open={!!currentSelectedReward}
        onClose={handleCloseSheet}
        containerClassname={`p-4 ${
          currentSelectedReward?.type !== "voucher" ? "max-h-[90vh]" : ""
        }`}
        withoutPadding
      >
        <View className="flex flex-col w-full">
          <p className="text-[16px] font-bold text-black mb-4 text-center">
            Mau tukar stamp dengan hadiah ini?
          </p>

          {currentSelectedReward && (
            <div className="w-full">
              <HorizontalStampCard
                imageUrl={currentSelectedReward.image}
                title={currentSelectedReward.reward_name_id}
                originalStamp={currentSelectedReward.redeem_nominal}
                discountedStamp={currentSelectedReward.redeem_nominal}
                isHistory={false}
              />
            </div>
          )}

          {currentSelectedReward?.type === "voucher" ? (
            <p className="text-sm text-grey mt-4 text-center mb-2">
              Tukarkan {currentSelectedReward.redeem_nominal} stamp untuk
              mendapatkan hadiah ini sekarang!
            </p>
          ) : (
            <div>
              <p className="text-sm font-semibold mb-2">Deskripsi</p>
              <div className="w-full max-h-[30vh] bg-inactiveGrey overflow-y-auto rounded-lg mb-4">
                <p className="text-sm text-grey p-4">
                  {currentSelectedReward?.reward_desc_id}
                </p>
              </div>
            </div>
          )}
        </View>

        <Button
          disabled={isLoadingRedeemVoucher}
          label="Tukar Sekarang"
          onClick={handleCheckout}
          className="mb-2"
        />
        <Button
          label="Nanti Saja"
          onClick={handleCloseSheet}
          style="secondary"
          // className="mb-8"
        />
      </BottomSheet>

      <NotificationToast
        description="Terjadi kesalahan. Silakan coba lagi nanti."
        duration={3000}
        show={visibleNotificationToast}
        onClose={toggleVisibleNotificationToast}
      />
    </View>
  );
};

export default TukarHadiah;
