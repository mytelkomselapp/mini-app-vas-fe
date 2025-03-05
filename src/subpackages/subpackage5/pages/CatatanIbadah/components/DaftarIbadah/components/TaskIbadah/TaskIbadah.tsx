import * as React from "react";
import MorningIcon from "../../../../../../../../assets/morning-tab.svg";
import AfternoonIcon from "../../../../../../../../assets/afternoon-tab.svg";
import NightIcon from "../../../../../../../../assets/night-tab.svg";
import { View } from "@tarojs/components";
import CardTaskIbadah from "../CardTaskIbadah/CardTaskIbadah";
import useToggle from "../../../../../../../../hooks/useToggle";
import DetailTaskIbadahModal from "../../../../modals";
import {
  DataDetailTaskRamadhanProps,
  useDataCatatanIbadah,
  useDetailTaskRamadhan,
} from "../../../../../../../../store/ramadhan";
import {
  getCurrentDayRamadhan,
  getCurrentTaskStatus,
  isTaskIbadahEnabledByTimeRules,
  translateTaskType,
} from "../../../../../../../../lib/utils";
import IconSchedule from "../../../../../../../../assets/ico_schedule.svg";
import { AsSvg } from "../../../../../../../../components/Svg";
import {
  StampMissionListDataConfig,
  MissionPopupCMSData,
} from "../../../../../../../../network/types/response-props";
import { usePostSubmitMission } from "../../../../../../../../network";
import { queryClient } from "../../../../../../../../hoc/withProvider";
import NotificationToast from "../../../../../../../../components/NotificationToast";

export interface TaskIbadahProps {
  dataStampMissionListConfig: StampMissionListDataConfig[];
  dataMissionPopupCMS: MissionPopupCMSData[];
}

export type TaskIbadahActiveTabType = "morning" | "afternoon" | "night";

const TaskIbadah: React.FC<TaskIbadahProps> = ({
  dataStampMissionListConfig = [],
  dataMissionPopupCMS = [],
}) => {
  const [notificationToast, setNotificationToast] = React.useState<{
    message: string;
    type: "success" | "error";
  }>({
    message: "Test message",
    type: "success",
  });
  const [activeTab, setActiveTab] =
    React.useState<TaskIbadahActiveTabType>("morning");

  const { mutateAsync: postSubmitMission, isLoading: loadingSubmitMission } =
    usePostSubmitMission();

  const { setData } = useDetailTaskRamadhan();
  const { currentDay, setCurrentDay } = useDataCatatanIbadah();
  const activeTaskStatus = getCurrentTaskStatus(currentDay);

  const dataConfigItem = [...dataStampMissionListConfig]?.find(
    (data) => data?.category === translateTaskType(activeTab)
  );
  const dataCardByActiveTab = dataConfigItem?.mission;

  const { active: visibleTaskModal, toggleActive: toggleVisibleTaskModal } =
    useToggle();
  const {
    active: visibleNotificationToast,
    toggleActive: toggleVisibleNotificationToast,
  } = useToggle();

  const handleOpenTaskModal = (data: DataDetailTaskRamadhanProps) => {
    const configTimelimit = isTaskIbadahEnabledByTimeRules(
      dataConfigItem?.category as any,
      data?.mission_name_id
    );

    if (!configTimelimit?.isEnable) {
      setNotificationToast({
        type: "error",
        message: configTimelimit?.message,
      });
      toggleVisibleNotificationToast();
    } else {
      setData(data);
      toggleVisibleTaskModal();
    }
  };

  const handleClick = (activeTab: "morning" | "afternoon" | "night") => {
    setActiveTab(activeTab);
  };

  const handleBackToToday = () => {
    const currentDay = getCurrentDayRamadhan();

    setCurrentDay(currentDay as string);
  };

  const generateBorder = (isActive: boolean) => {
    if (isActive) {
      return {
        border: "2px solid #dae0e9",
        borderBottom: "2px solid white",
      };
    }

    return {};
  };

  const generateClassname = (isActive: boolean) => {
    if (isActive)
      return `text-[16px] text-center flex justify-center items-center relative top-[2px] gap-x-1 h-[40px] font-bold text-black rounded-t-[16px]`;

    return `text-[16px] text-center flex justify-center items-center gap-x-1 h-[40px] font-bold text-[#757F90]`;
  };

  const handleSubmitMission = async (missionId: string) => {
    try {
      const postSubmission = await postSubmitMission({
        mission_id: missionId,
        category: dataConfigItem?.category as any,
        category_id: dataConfigItem?.category_id as any,
      });
      // @ts-ignore
      const statusCode = postSubmission?.statusCode;
      const isSuccess = statusCode == 200;

      if (isSuccess) {
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
          queryKey: ["Fetch User Stamp"],
        });
        queryClient.invalidateQueries({
          queryKey: `Fetch Mission Summary - ${currentDay}`,
        });
        queryClient.invalidateQueries({
          queryKey: ["Fetch Stamp Mission Summary", { date: currentDay }],
        });
        queryClient.invalidateQueries({
          queryKey: ["Fetch Stamp Mission List", { date: currentDay }],
        });

        toggleVisibleTaskModal();
      } else {
        if (statusCode === 429) {
          setNotificationToast({
            message: "Tunggu sebentar, checklist sebelumnya",
            type: "error",
          });
          toggleVisibleNotificationToast();
          toggleVisibleTaskModal();
        }
      }
    } catch (_) {
      setNotificationToast({
        message: "Kamu sudah mengisi ibadah ini",
        type: "error",
      });
      toggleVisibleNotificationToast();
    }
  };

  return (
    <React.Fragment>
      <View className="mt-1">
        <div className="px-[20px] bg-white relative z-10 grid grid-cols-3">
          <div
            onClick={() => handleClick("morning")}
            style={generateBorder(activeTab === "morning")}
            className={generateClassname(activeTab === "morning")}
          >
            <div
              className={`flex justify-center items-center gap-x-1 ${
                activeTab === "morning" ? "relative top-[-2px]" : ""
              }`}
            >
              <img width="20px" height="20px" src={MorningIcon} />
              Pagi
            </div>
          </div>
          <div
            onClick={() => handleClick("afternoon")}
            style={generateBorder(activeTab === "afternoon")}
            className={generateClassname(activeTab === "afternoon")}
          >
            <div
              className={`flex justify-center items-center gap-x-1 ${
                activeTab === "afternoon" ? "relative top-[-2px]" : ""
              }`}
            >
              <img width="20px" height="20px" src={AfternoonIcon} />
              Siang
            </div>
          </div>
          <div
            onClick={() => handleClick("night")}
            style={generateBorder(activeTab === "night")}
            className={generateClassname(activeTab === "night")}
          >
            <div
              className={`flex justify-center items-center gap-x-1 ${
                activeTab === "night" ? "relative top-[-2px]" : ""
              }`}
            >
              <img width="20px" height="20px" src={NightIcon} />
              Malam
            </div>
          </div>
        </div>

        {["today", "past"]?.includes(activeTaskStatus) ? (
          <div
            style={{ borderTop: "2px solid #dae0e9" }}
            className="w-full min-h-[260px] rounded-t-[16px] py-[12px]"
          >
            <p className="text-[12px] mb-2 px-[20px] text-[#757f90]">
              Pilih kegiatan yang sudah kamu lakukan, yuk!
            </p>

            <div className="grid grid-cols-3 px-[20px] gap-x-2 gap-y-2">
              {dataCardByActiveTab?.map((data, idx) => {
                const generateCondition = () => {
                  if (activeTaskStatus === "today") {
                    if (data?.mission_status === 0) return "checked";
                    if (data?.mission_status === 1) return "active";
                  }

                  if (activeTaskStatus === "past") {
                    if (data?.mission_status === 0) return "complete-disabled";
                    if (data?.mission_status === 1)
                      return "incomplete-disabled";
                  }
                };

                return (
                  <CardTaskIbadah
                    data={data}
                    condition={generateCondition() as any}
                    key={idx}
                    onClick={handleOpenTaskModal}
                    type={dataConfigItem?.category as any}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div
            style={{ borderTop: "2px solid #dae0e9" }}
            className="h-[200px] flex flex-col items-center justify-center gap-y-2 rounded-t-[16px] py-[12px]"
          >
            <AsSvg src={IconSchedule} width="24px" height="24px" />
            <p className="text-[12px] text-[#757f90] whitespace-pre text-center">{`Saat ini, kamu belum bisa mencatat ibadah untuk hari\nlain. Yuk, lanjutkan nanti!`}</p>

            <button
              onClick={handleBackToToday}
              className="text-[12px] h-[35px] my-1 px-[16px] py-[8px] rounded-[40px] !bg-[#ed0226] text-white font-[600]"
            >
              Kembali ke Hari Ini
            </button>
          </div>
        )}

        <DetailTaskIbadahModal
          data={dataMissionPopupCMS}
          visible={visibleTaskModal}
          onClose={toggleVisibleTaskModal}
          onSubmit={handleSubmitMission}
          submitLoading={loadingSubmitMission}
        />
      </View>
      <NotificationToast
        type={notificationToast?.type}
        description={notificationToast?.message}
        duration={3000}
        fontWeight={"normal"}
        show={visibleNotificationToast}
        onClose={toggleVisibleNotificationToast}
      />
    </React.Fragment>
  );
};

export default TaskIbadah;
