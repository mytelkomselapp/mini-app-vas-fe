import { View } from "@tarojs/components";
import BackgroundCatatanIbadah from "../../../../assets/bg/jurnal-ibadah-header.png";
import StampIcon from "../../../../assets/stamp.svg";
import BackgroundImage from "../../../../components/BackgroundImage";
import ButtonRedeem from "./components/ButtonRedeem/ButtonRedeem";
import { DateStamp } from "./components";
import DaftarIbadah from "./components/DaftarIbadah";
import { generateArrayRangeDate, handleNavigate } from "../../../../lib/utils";
import {
  useBulkFetchMissionSummary,
  useFetchUserStamp,
} from "../../../../network";
import moment from "moment";
import { StampMissionSummaryData } from "../../../../network/types/response-props";
import NotificationModal from "./components/NotificationModal";
import Taro from "@tarojs/taro";
import useToggle from "../../../../hooks/useToggle";
import { useEffect } from "react";

const CatatanIbadahPage = () => {
  const { data: dataUserStampRaw } = useFetchUserStamp();

  const {
    active: visibleNotificationModal,
    toggleActive: toggleVisibleNotificationModal,
  } = useToggle();

  /* why need new current day variable because currentDay from state is for selected date, currentDayMoment for fetch data until today */
  const currentDayMoment = moment();
  const rangeDate = generateArrayRangeDate(
    "2025-02-01",
    currentDayMoment?.format("YYYY-MM-DD")
  );

  const { data: dataMissionSummary } = useBulkFetchMissionSummary(rangeDate);

  const dataUserStamp = dataUserStampRaw?.data?.data;
  const totalStamp = dataUserStamp?.total_stamp ?? 0;

  const handleActivateNotification = () => {
    Taro.showModal({
      title: "“MyTelkomsel” Would Like to Use Your Notification",
      content:
        "Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.",
      confirmText: "Settings",
      cancelText: "Ok",
      success: (res) => {
        if (res.confirm) {
          Taro.openSetting();
        }
      },
    });
  };

  const handleGoToRedeemPage = () => {
    /** TODO: Navigate Redeem Page */
    handleNavigate("/subpackages/subpackage7/pages/TukarHadiah/index");
  };

  useEffect(() => {
    Taro.getSetting({
      success: (res) => {
        if (!res.authSetting["scope.subscribeMessage"])
          toggleVisibleNotificationModal();
      },
    });
  }, []);

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
            <p className="text-[20px] font-bold text-white">{totalStamp}</p>
          </div>
        </div>
        <div className="flex justify-end pr-[20px] items-center w-[50%] h-auto">
          <ButtonRedeem title="Tukar Hadiah" onClick={handleGoToRedeemPage} />
        </div>
      </BackgroundImage>

      {/* <LottieOverlay /> */}

      <View className="bg-white rounded-t-[16px] relative top-[-20px] min-h-[100px]">
        <DateStamp
          dataMissionSummary={dataMissionSummary as StampMissionSummaryData[]}
        />
        <DaftarIbadah
          dataMissionSummary={dataMissionSummary as StampMissionSummaryData[]}
        />
      </View>
      <NotificationModal
        open={visibleNotificationModal}
        onClose={toggleVisibleNotificationModal}
        onClickCTA={handleActivateNotification}
      />
    </View>
  );
};

export default CatatanIbadahPage;
