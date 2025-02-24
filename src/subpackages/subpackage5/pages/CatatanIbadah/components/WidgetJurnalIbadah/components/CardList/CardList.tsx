import React from "react";
import CardItem from "../CardItem";

import { Text, View } from "@tarojs/components";
import {
  useFetchMissionPopupCMS,
  useFetchStampMissionList,
  usePostSubmitMission,
} from "../../../../../../../../network";
import DetailTaskIbadahModal from "../../../../modals";
import useToggle from "../../../../../../../../hooks/useToggle";
import {
  useDetailTaskRamadhan,
  useDataCatatanIbadah,
} from "../../../../../../../../store/ramadhan";
import { queryClient } from "../../../../../../../../hoc/withProvider";
import NotificationToast from "../../../../../../../../components/NotificationToast";
import CheckedGray from "../../../../../../../../assets/checked-mark-grey.svg";

const CardList = () => {
  const { currentDay } = useDataCatatanIbadah();

  const [submittedMissionId, setSubmittedMissionId] = React.useState<string[]>(
    []
  );
  const [notificationToast, setNotificationToast] = React.useState<{
    message: string;
    type: "success" | "error";
  }>({
    message: "Test message",
    type: "success",
  });
  const [animateSubmittedMissionId, setAnimateSubmittedMissionId] =
    React.useState<string[]>([]);

  const { setData } = useDetailTaskRamadhan();
  const { active: visibleTaskModal, toggleActive: toggleVisibleTaskModal } =
    useToggle();
  const {
    active: visibleNotificationToast,
    toggleActive: toggleVisibleNotificationToast,
  } = useToggle();

  const { data: dataMissionPopupCMSRaw } = useFetchMissionPopupCMS();
  const { data: dataStampMissionListRaw } = useFetchStampMissionList(
    { date: currentDay },
    !!currentDay
  );

  const { mutateAsync: postSubmitMission, isLoading: loadingSubmitMission } =
    usePostSubmitMission();

  const dataMissionPopupCMS = dataMissionPopupCMSRaw?.data?.data ?? [];
  const dataStampMission = dataStampMissionListRaw?.data?.data?.Config ?? [];

  const dataList = dataStampMission
    ?.flatMap(
      (data) =>
        data?.mission?.map((mission) => ({
          ...mission,
          category: data?.category,
          category_id: data?.category_id,
        })) || []
    )
    ?.filter((data) => data?.mission_status === 1)
    ?.filter((data) => !animateSubmittedMissionId?.includes(data?.mission_id));

  const indexHiddenCard = dataList
    ?.map((data, index) => {
      const isHiddenCard = submittedMissionId.includes(data?.mission_id);

      if (isHiddenCard) {
        return index;
      }
    })
    ?.filter((data) => data !== undefined);

  const actualRemainingMission =
    dataList?.length - indexHiddenCard?.length || 0;
  const remainingMissionText = dataList?.length - 3 || 0;

  const handleClick = (data) => {
    setData(data);
    toggleVisibleTaskModal();
  };

  const handleSubmitMission = async (missionId: string) => {
    const data = dataList.find((data) => data?.mission_id === missionId);

    // @ts-ignore
    const payload = {
      mission_id: missionId,
      category: data?.category as any,
      category_id: data?.category_id as any,
    };

    try {
      const postSubmission = await postSubmitMission(payload);

      const earnedStamp = postSubmission?.data?.data?.today_earned_stamp || 0;
      const isShowMilestoneToast = [70, 100, 140]?.some(
        (data) => data === earnedStamp
      );

      if (isShowMilestoneToast) {
        setNotificationToast({
          message: `Selamat, kamu telah mendapatkan ${earnedStamp} stamp`,
          type: "success",
        });
        toggleVisibleNotificationToast();
      }

      /*  Refetch user stamp and stamp mission list */
      queryClient.invalidateQueries({
        queryKey: ["Fetch Stamp Mission Summary", { date: currentDay }],
      });

      toggleVisibleTaskModal();
      setSubmittedMissionId([...submittedMissionId, missionId]);

      setTimeout(() => {
        setAnimateSubmittedMissionId([...animateSubmittedMissionId, missionId]);
      }, 1000);
    } catch (_) {
      setNotificationToast({
        message: "Kamu sudah mengisi ibadah ini",
        type: "error",
      });
      toggleVisibleNotificationToast();
    }
  };

  if (actualRemainingMission <= 0) {
    return (
      <View className="flex flex-col justify-center items-center h-[242px] gap-y-2 px-[16px]">
        <img src={CheckedGray} alt="CheckMark" width="24px" height="24px" />
        <Text className="text-[12px] text-[#9ca9b9] text-center">
          Kamu sudah menyelesaikan semua ibadah dalam hari ini, silakan kembali
          lagi besok!
        </Text>
      </View>
    );
  }

  return (
    <React.Fragment>
      <View className="flex flex-col w-full h-[242px]">
        <View className="p-[12px] overflow-hidden translate-y-56 h-[85%] rounded-[16px]">
          {dataList?.map((data, index) => {
            const maxIndex = Math.max(...indexHiddenCard);
            const isHiddenCard = indexHiddenCard?.includes(index);
            const isSlideUpCard =
              indexHiddenCard?.length > 0 ? index > maxIndex : false;

            const generateAnimate = () => {
              if (isHiddenCard) {
                return "hide";
              }

              if (isSlideUpCard) {
                return "slide-up";
              }

              return "no-animation";
            };

            return (
              <CardItem
                key={data?.mission_id}
                data={data}
                type={data?.category as "pagi" | "siang" | "malam"}
                onClick={handleClick}
                animate={generateAnimate()}
              />
            );
          })}
        </View>
        <View className="p-[12px] flex gap-y-2 h-[13%]">
          <Text className="text-[10px] relative top-[-6px] text-[#757f90]">
            +{remainingMissionText} kegiatan tersisa
          </Text>
        </View>
      </View>
      <DetailTaskIbadahModal
        data={dataMissionPopupCMS}
        visible={visibleTaskModal}
        onClose={toggleVisibleTaskModal}
        onSubmit={handleSubmitMission}
        submitLoading={loadingSubmitMission}
      />
      <NotificationToast
        type={notificationToast?.type}
        description={notificationToast?.message}
        duration={3000}
        fontWeight={notificationToast?.type === "error" ? "bold" : "normal"}
        show={visibleNotificationToast}
        onClose={toggleVisibleNotificationToast}
      />
    </React.Fragment>
  );
};

export default CardList;
