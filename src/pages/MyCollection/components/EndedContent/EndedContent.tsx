import { View } from "@tarojs/components";
import ContentTitle from "../ContentTitle";
import OtherPackageList from "../OtherPackageList";
import PackageList from "../PackageList";

import DataOtherPackage from "../../../../data/my-collection-other-package.json";
import DataPackageList from "../../../../data/my-collection-inactive.json";

const EndedContent = () => {
  return (
    <View className="flex flex-col gap-y-[16px] py-[16px]">
      <ContentTitle
        title="Perpanjang Paket Kamu"
        subtitle="Beli dan langganan lagi biar selalu dapat update"
      />
      <PackageList data={DataPackageList} />
      <OtherPackageList data={DataOtherPackage} />
    </View>
  );
};

export default EndedContent;
