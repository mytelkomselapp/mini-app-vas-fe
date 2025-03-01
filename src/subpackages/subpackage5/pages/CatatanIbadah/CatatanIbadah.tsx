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
  useFetchNotificationJurnalIbadahConfig,
  useFetchUserStamp,
  usePostNotificationJurnalIbadahConfig,
} from "../../../../network";
import moment from "moment";
import {
  JurnalIbadahNotificationProps,
  StampMissionSummaryData,
} from "../../../../network/types/response-props";
import useTaroNavBar from "../../../../hooks/useTaroNavBar";
import NotificationModal from "./components/NotificationModal";
import useToggle from "../../../../hooks/useToggle";
import LoadingScreen from "../../../../components/LoadingScreen";
import NotificationToast from "../../../../components/NotificationToast";
import Show from "../../../../components/Show";

const CatatanIbadahPage = () => {
  /* why need new current day variable because currentDay from state is for selected date, currentDayMoment for fetch data until today */
  const currentDayMoment = moment()?.format("YYYY-MM-DD");
  const startOfMonth = moment()?.startOf("month")?.format("YYYY-MM-DD");

  /** TODO: remove hardcoded rangeDate */
  const rangeDate = generateArrayRangeDate(
    startOfMonth || "",
    currentDayMoment
  );

  const {
    active: visibleNotificationModal,
    setActive: toggleVisibleNotificationModal,
  } = useToggle();
  const { active: visibleToast, toggleActive: toggleVisibleToast } =
    useToggle();

  const { data: dataUserStampRaw } = useFetchUserStamp();
  const {
    mutateAsync: postNotificationJurnalIbadah,
    isLoading: loadingPostNotification,
  } = usePostNotificationJurnalIbadahConfig();
  const { data: dataMissionSummary } = useBulkFetchMissionSummary(rangeDate);

  const handleSuccessFetchJurnalIbadahConfig = (
    data: JurnalIbadahNotificationProps
  ) => {
    if (data?.notification_status === "NEW")
      return toggleVisibleNotificationModal(true);
  };

  const { isFetching: fetchingNotification } =
    useFetchNotificationJurnalIbadahConfig(
      handleSuccessFetchJurnalIbadahConfig
    );

  const dataUserStamp = dataUserStampRaw?.data?.data;
  const totalStamp = dataUserStamp?.total_stamp ?? 0;

  const isLoading = fetchingNotification;

  const handleActivateNotification = async (answer: "ON" | "OFF") => {
    try {
      const postData = await postNotificationJurnalIbadah({
        notification_status: answer,
      });

      if (postData) {
        return toggleVisibleNotificationModal(false);
      }
    } catch (_) {
      toggleVisibleToast();
      toggleVisibleNotificationModal(false);
    }
  };

  const handleGoToRedeemPage = () => {
    /** TODO: Navigate Redeem Page */
    handleNavigate("/subpackages/subpackage7/pages/TukarHadiah/index");
  };

  useTaroNavBar();

  return (
    <>
      <Show when={isLoading}>
        <LoadingScreen text="Loading..." customClassName="mx-[20px]" />
      </Show>
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

        <View
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 81%, rgba(2,127,210,0.3) 100%);",
          }}
          className="rounded-t-[16px] relative top-[-20px] min-h-[100px]"
        >
          <DateStamp
            dataMissionSummary={dataMissionSummary as StampMissionSummaryData[]}
          />
          <DaftarIbadah
            dataMissionSummary={dataMissionSummary as StampMissionSummaryData[]}
          />
        </View>
        <NotificationModal
          isLoading={loadingPostNotification}
          open={visibleNotificationModal}
          onClose={() => toggleVisibleNotificationModal(false)}
          onClickCTA={handleActivateNotification}
        />
        <NotificationToast
          duration={3000}
          show={visibleToast}
          onClose={toggleVisibleToast}
          description="Error when activate notification"
        />
      </View>
    </>
  );
};

export default CatatanIbadahPage;
