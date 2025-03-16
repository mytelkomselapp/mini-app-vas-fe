import { View } from "@tarojs/components";
import { useNavigate } from "../../../../hooks";

import ContentTitle from "../ContentTitle";
import PackageList from "../PackageList";
import OtherPackageList from "../OtherPackageList";

import DataMyCollection from "../../../../data/my-collection.json";
import DataOtherPackage from "../../../../data/my-collection-other-package.json";

const ActiveContent = () => {
  const { navigate } = useNavigate();

  const handleClick = () => {
    navigate("/pages/CollectionContentDetail/index");
  };

  return (
    <View className="flex flex-col gap-y-[16px] py-[16px] overflow-y-auto">
      <ContentTitle
        title="Konten Premium Aktif"
        subtitle="Lihat update terbaru dari kreator langgananmu"
      />
      <PackageList data={DataMyCollection} onClick={handleClick} />
      <OtherPackageList data={DataOtherPackage} />
    </View>
  );
};

export default ActiveContent;
