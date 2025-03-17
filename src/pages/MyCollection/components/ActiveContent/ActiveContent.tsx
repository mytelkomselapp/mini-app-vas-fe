import { View } from "@tarojs/components";
import { useNavigate } from "../../../../hooks";
import { FilterChips } from "../../../../components";
import { PackageProps } from "../PackageList/PackageList";
import { FilterChipItemProps } from "../../../../components/FilterChips/type";

import ContentTitle from "../ContentTitle";
import PackageList from "../PackageList";
import OtherPackageList from "../OtherPackageList";

import DataMyCollection from "../../../../data/my-collection.json";
import DataOtherPackage from "../../../../data/my-collection-other-package.json";
import React from "react";

const ActiveContent = () => {
  const { navigate } = useNavigate();
  const [dataPackage, setDataPackage] =
    React.useState<PackageProps[]>(DataMyCollection);

  const handleClickPackage = (val: PackageProps) => {
    navigate(`/pages/CollectionContentDetail/index?type=${val?.subscription_status}`);
  };

  const countPackageData = {
    all: DataMyCollection?.length,
    updated: [...DataMyCollection]?.filter(
      (data) => data?.subscription_status === "updated"
    )?.length,
    subscribe: [...DataMyCollection]?.filter(
      (data) => data?.subscription_status === "berlangganan"
    )?.length,
    oneTimePurchase: [...DataMyCollection]?.filter(
      (data) => data?.subscription_status === "sekali-beli"
    )?.length,
  };

  const handleClickFilter = (data: FilterChipItemProps) => {
    /** TODO: you can use data callback to refetch data from api based on active filter */
    const filterType = data?.slug;
    if (filterType !== "semua-konten") {
      setDataPackage(
        [...DataMyCollection]?.filter(
          (data) => data?.subscription_status === filterType
        )
      );
    }

    return DataMyCollection;
  };

  /** A variable is created because some values are dynamic  */
  const filterOptions: FilterChipItemProps[] = [
    {
      index: 0,
      slug: "semua-konten",
      title: `Semua Konten (${countPackageData?.all})`,
    },
    {
      index: 1,
      slug: "updated",
      title: `Terupdate (${countPackageData?.updated})`,
    },
    {
      index: 2,
      slug: "berlangganan",
      title: `Berlangganan (${countPackageData?.subscribe})`,
    },
    {
      index: 3,
      slug: "sekali-beli",
      title: `Sekali Beli (${countPackageData?.oneTimePurchase})`,
    },
  ];

  return (
    <View className="flex flex-col gap-y-[16px] py-[16px] overflow-y-auto overflow-x-hidden">
      <ContentTitle
        title="Konten Premium Aktif"
        subtitle="Lihat update terbaru dari kreator langgananmu"
      />
      <FilterChips
        filterList={filterOptions}
        defaultActiveIndex={0}
        className="ml-[16px] mb-[2px]"
        onClick={handleClickFilter}
      />
      <PackageList data={dataPackage} onClick={handleClickPackage} />
      <OtherPackageList data={DataOtherPackage} />
    </View>
  );
};

export default ActiveContent;
