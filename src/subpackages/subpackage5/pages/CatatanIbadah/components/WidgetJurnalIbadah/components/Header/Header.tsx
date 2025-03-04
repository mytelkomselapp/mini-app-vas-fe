import { Text } from "@tarojs/components";

import BackgroundImage from "../../../../../../../../components/BackgroundImage";
import BackgroundCatatanIbadah from "../../../../../../../../assets/bg/jurnal-ibadah-header.png";
import StampIcon from "../../../../../../../../assets/stamp.svg";
import ButtonRedeem from "../../../ButtonRedeem";
import { handleNavigate } from "../../../../../../../../lib/utils";
import { useFetchStampMissionSummary } from "../../../../../../../../network";
import { useDataCatatanIbadah } from "../../../../../../../../store/ramadhan";

const Header = () => {
  const { currentDay } = useDataCatatanIbadah();
  const { data: dataUserStamp } = useFetchStampMissionSummary({
    date: currentDay,
  });

  const dataStamp = dataUserStamp?.data?.data;
  const todayStamp = dataStamp?.collected_stamp || 0;

  const handleGoToRedeemPage = () => {
    /** TODO: Navigate Redeem Page */
    handleNavigate("/subpackages/subpackage7/pages/TukarHadiah/index");
  };

  return (
    <BackgroundImage
      imageUrl={BackgroundCatatanIbadah}
      bgSize="cover"
      className="flex justify-between rounded-t-[16px] p-[12px] h-[48px] relative"
    >
      <div className="flex flex-col items-start w-[50%]">
        <Text className="text-[12px] font-bold text-white">
          Total Stamp Hari Ini
        </Text>
        <div className="flex gap-x-[4px] items-center">
          <div className="rounded-full w-[24px] h-[24px] ">
            <img src={StampIcon} width="20px" height="20px" />
          </div>
          <Text className="text-[20px] font-bold text-white">{todayStamp}</Text>
        </div>
      </div>
      <div className="flex justify-end items-center w-[50%] h-auto">
        <ButtonRedeem
          title="Tukar Hadiah"
          customClassName="relative right-[-16px]"
          onClick={handleGoToRedeemPage}
        />
      </div>
    </BackgroundImage>
  );
};

export default Header;
