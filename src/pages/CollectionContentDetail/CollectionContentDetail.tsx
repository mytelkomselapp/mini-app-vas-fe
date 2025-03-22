import { Image, Text, View } from "@tarojs/components";
import premiumBadge from "../../assets/premium-badge.svg";
import SubscriptionBottomSheet from "./components/SubscriptionBottomSheet";
import FullLoadingScreen from "../../components/FullLoadingScreen";
import { useState } from "react";
import { FilterChipItemProps } from "../../components/FilterChips/type";
import FilterChips from "../../components/FilterChips";

import CollectionDataSubs from "../../data/my-collection-detail-subs.json";
import CollectionDataOneTime from "../../data/my-collection-detail-one-time.json";
import Taro from "@tarojs/taro";
import UtilityBottomSheet from "./components/UtilityBottomSheet";
import { FeedItem } from "./components/FeedItem";
import LoadingScreen from "../../components/LoadingScreen";
import ErrorScreen from "../../components/ErrorScreen";
import { useNavigate } from "../../hooks";
import iconCS from '../../assets/ico-customer-service.svg'
import iconBroken from '../../assets/ico-broken-image.svg'
import HelpCenterBottomSheet from "./components/HelpCenterBottomSheet";

interface ContentProps {
  imageThumbnail: string;
  type: "video" | "image";
  title: string;
  description: string;
  duration?: string;
  status: "ineligible" | "eligible";
}

const filterOptions: FilterChipItemProps[] = [
  {
    index: 0,
    slug: "semua-konten",
    title: `Semua Konten`,
  },
  {
    index: 1,
    slug: "image",
    title: `Foto`,
  },
  {
    index: 2,
    slug: "video",
    title: `Video`,
  },
  {
    index: 3,
    slug: "more",
    title: `•••`,
  }
];

const CollectionContentDetail = () => {
  const { navigate } = useNavigate();
  const searchParams = Taro.getCurrentInstance().router?.params;
  const type = searchParams?.type;

  // @ts-ignore
  const dummyData: ContentProps[] =
    type === "berlangganan" ? CollectionDataSubs : CollectionDataOneTime;
  const [isFullLoading, setIsFullLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [utilityOpen, setUtilityOpen] = useState(false);
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);
  const [helpCenterOpen, setHelpCenterOpen] = useState(false);
  const [collectionData, setCollectionData] =
    useState<ContentProps[]>(dummyData);
  const handleClickFilter = (data: FilterChipItemProps) => {
    if (data?.slug === "more") {
      setUtilityOpen(true);
    } else {
      const filterType = data?.slug;
      if (filterType !== "semua-konten") {
        setCollectionData(
          [...dummyData]?.filter((data) => data.type === filterType)
        );
      } else {
        setCollectionData(dummyData);
      }
    };
  }

    const handleViewItem = (data: ContentProps) => {
      const isVideo = data?.type === "video";
      if (isVideo) {
        const url = "https://www.w3schools.com/html/mov_bbb.mp4"; //must be mp4 format
        navigate(`/pages/VideoContent/index?url=${url}&title=${data?.title}`);
      } else {
        navigate(`/pages/StoriesImage/index?title=${data?.title}`);
      }
    };

    const utilityItems = [
      {
        icon: iconCS,
        label: 'Pusat Bantuan',
        onClick: () => setHelpCenterOpen(true)
      },
      {
        icon: iconBroken,
        label: 'Berhenti berlang...',
        onClick: () => setSubscriptionOpen(true)
      }
    ]

    return (
      <>
        {isError && <ErrorScreen onRefresh={() => setIsError(false)} />}
        {isLoading && <LoadingScreen text="Memuat konten..." />}
        {isFullLoading && <FullLoadingScreen />}
        <View className="flex flex-col min-h-[screen]">
          <View className="flex flex-col items-center p-4">
            <View className="mb-3 w-20 h-20 relative">
              <View className="overflow-hidden w-full h-full rounded-full">
                <Image
                  src="https://placehold.co/80x80/ff69b4/ff69b4"
                  className="w-full h-full object-cover"
                />
              </View>
              <View className="absolute bottom-0 right-0 w-[28px] h-[28px]">
                <Image
                  src={premiumBadge}
                  className="w-full h-full"
                />
              </View>
            </View>
            <Text className="mb-1 text-lg font-semibold text-primaryBlack">
              Langganan JKT48 Premium Konten
            </Text>
            <View className="flex flex-row items-center">
              <Text className="text-xs text-textSecondary">Durasi 90 hari</Text>
              <View className="w-1 h-1 mx-2 rounded-full bg-textSecondary" />
              <Text className="text-xs text-textSecondary">
                Update 2 hari sekali
              </Text>
            </View>
          </View>

          <View className="flex justify-center">
            <FilterChips
              filterList={filterOptions}
              defaultActiveIndex={0}
              onClick={handleClickFilter}
              className="w-full px-4 -mr-[17px]"
              containerClassName="justify-center"
            />
          </View>

          <View className="flex flex-row justify-center items-center py-[6px] w-full"></View>

          <View className="grid grid-cols-3 gap-[3px] p-[12px]">
            {collectionData.map((data, key) => (
              <FeedItem
                key={key}
                data={data}
                onClick={() => handleViewItem(data)}
              />
            ))}
          </View>

          <UtilityBottomSheet
            open={utilityOpen}
            onClose={() => setUtilityOpen(false)}
            utilityItems={utilityItems}
          />
          <SubscriptionBottomSheet
            open={subscriptionOpen}
            onConfirm={() => {
              setSubscriptionOpen(false);
            }}
            onCancel={() => navigate(`/pages/MyCollection/index?order=1`)}
            onClose={() => setSubscriptionOpen(false)}
          />
          <HelpCenterBottomSheet
            open={helpCenterOpen}
            onClose={() => setHelpCenterOpen(false)}
          />
        </View>
      </>
    );
  };

  export default CollectionContentDetail;
