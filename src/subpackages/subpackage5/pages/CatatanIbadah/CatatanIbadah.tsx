import { View } from "@tarojs/components";
import BackgroundCatatanIbadah from "../../../../assets/bg/jurnal-ibadah-header.png";
import StampIcon from "../../../../assets/stamp.svg";
import BackgroundImage from "../../../../components/BackgroundImage";
import ButtonRedeem from "./components/ButtonRedeem/ButtonRedeem";
import { DateStamp } from "./components";
import DaftarIbadah from "./components/DaftarIbadah";
import { handleNavigate } from "../../../../lib/utils";
import { useFetchUserStamp } from "../../../../network";

const CatatanIbadahPage = () => {
  const { data: dataUserStampRaw } = useFetchUserStamp();

  const dataUserStamp = dataUserStampRaw?.data?.data;
  const totalStamp = dataUserStamp?.total_stamp ?? 0;

  const handleGoToRedeemPage = () => {
    /** TODO: Navigate Redeem Page */
    handleNavigate("/subpackages/subpackage7/pages/TukarHadiah/index");
  };

  return (
    <View className="bg-white w-full min-h-full h-auto">
      <BackgroundImage
        className="flex justify-between px-[20px] items-center w-full h-[116px]"
        imageUrl={BackgroundCatatanIbadah}
      >
        <div className="flex flex-col items-start w-[50%]">
          <p className="text-[12px] font-bold text-white">Total Stamp</p>
          <div className="flex gap-x-[4px] items-center">
            <div className="rounded-full w-[24px] h-[24px] ">
              <img src={StampIcon} width="20px" height="20px" />
            </div>
            <p className="text-[20px] font-bold text-white relative top-[-2px]">
              {totalStamp}
            </p>
          </div>
        </div>
        <div className="flex justify-end pr-[20px] items-center w-[50%] h-auto">
          <ButtonRedeem title="Tukar Hadiah" onClick={handleGoToRedeemPage} />
        </div>
      </BackgroundImage>

      <View className="bg-white rounded-t-[16px] relative top-[-20px] min-h-[100px]">
        <DateStamp />
        <DaftarIbadah />
      </View>
    </View>
  );
};

export default CatatanIbadahPage;
