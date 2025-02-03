import * as React from "react";
import MorningIcon from "../../../../../../../../assets/morning-tab.svg";
import AfternoonIcon from "../../../../../../../../assets/afternoon-tab.svg";
import NightIcon from "../../../../../../../../assets/night-tab.svg";
import { View } from "@tarojs/components";
import { DUMMY_CARD_TASK_IBADAH_LIST } from "../../../../constants";
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
} from "../../../../../../../../lib/utils";
import IconSchedule from "../../../../../../../../assets/ico_schedule.svg";
import { AsSvg } from "../../../../../../../../components/Svg";

export interface TaskIbadahProps {}

export type TaskIbadahActiveTabType = "morning" | "afternoon" | "night";

const TaskIbadah: React.FC<TaskIbadahProps> = () => {
  const [activeTab, setActiveTab] =
    React.useState<TaskIbadahActiveTabType>("morning");

  const { setData } = useDetailTaskRamadhan();
  const { currentDay, setCurrentDay } = useDataCatatanIbadah();
  const activeTaskStatus = getCurrentTaskStatus(currentDay);

  console.log({ activeTaskStatus });

  const dataCardByActiveTab = DUMMY_CARD_TASK_IBADAH_LIST?.[activeTab];

  const { active: visibleTaskModal, toggleActive: toggleVisibleTaskModal } =
    useToggle();

  const handleOpenTaskModal = (data: DataDetailTaskRamadhanProps) => {
    setData({
      id: data?.id,
      title: data?.title,
    });
    toggleVisibleTaskModal();
  };

  const handleClick = (activeTab: "morning" | "afternoon" | "night") => {
    setActiveTab(activeTab);
  };

  const handleBackToToday = () => {
    const currentDay = getCurrentDayRamadhan();

    setCurrentDay(currentDay);
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

  return (
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
          className="w-full min-h-[150px] rounded-t-[16px] py-[12px]"
        >
          <p className="text-[12px] mb-2 px-[20px] text-[#757f90]">
            Pilih kegiatan yang sudah kamu lakukan, yuk!
          </p>

          <div className="grid grid-cols-3 px-[20px] gap-x-2 gap-y-2">
            {[...dataCardByActiveTab]?.map((data, idx) => (
              <CardTaskIbadah
                id={data?.id}
                condition="active"
                key={idx}
                imageUrl={data?.imageUrl}
                title={data?.title}
                onClick={handleOpenTaskModal}
                type={data?.type as TaskIbadahActiveTabType}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[200px] flex flex-col items-center justify-center gap-y-2">
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
        visible={visibleTaskModal}
        onClose={toggleVisibleTaskModal}
        onSubmit={() => {}}
      />
    </View>
  );
};

export default TaskIbadah;
