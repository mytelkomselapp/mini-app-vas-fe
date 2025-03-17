import React from "react";
import { View } from "@tarojs/components";
import { PackageProps } from "../PackageList/PackageList";
import { FilterChipItemProps } from "../../../../components/FilterChips/type";
import { FilterChips } from "../../../../components";

import ContentTitle from "../ContentTitle";
import OtherPackageList from "../OtherPackageList";
import PackageList from "../PackageList";

import DataOtherPackage from "../../../../data/my-collection-other-package.json";
import DataPackageList from "../../../../data/my-collection-inactive.json";

const EndedContent = () => {
  const [dataPackage, setDataPackage] =
    React.useState<PackageProps[]>(DataPackageList);

  const countPackageData = {
    all: DataPackageList?.length,
    updated: [...DataPackageList]?.filter(
      (data) => data?.subscription_status === "updated"
    )?.length,
    subscribe: [...DataPackageList]?.filter(
      (data) => data?.subscription_status === "berlangganan"
    )?.length,
    oneTimePurchase: [...DataPackageList]?.filter(
      (data) => data?.subscription_status === "sekali-beli"
    )?.length,
  };

  const handleClickFilter = (data: FilterChipItemProps) => {
    /** TODO: you can use data callback to refetch data from api based on active filter */
    const filterType = data?.slug;
    if (filterType !== "semua-konten") {
      setDataPackage(
        [...DataPackageList]?.filter(
          (data) => data?.subscription_status === filterType
        )
      );
    }

    return DataPackageList;
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
    <View className="flex flex-col gap-y-[16px] py-[16px] overflow-x-hidden">
      <ContentTitle
        title="Perpanjang Paket Kamu"
        subtitle="Beli dan langganan lagi biar selalu dapat update"
      />
      <FilterChips
        filterList={filterOptions}
        defaultActiveIndex={0}
        className="ml-[16px] mb-[2px]"
        onClick={handleClickFilter}
      />
      <PackageList data={dataPackage} />
      <OtherPackageList data={DataOtherPackage} />
    </View>
  );
};

export default EndedContent;
