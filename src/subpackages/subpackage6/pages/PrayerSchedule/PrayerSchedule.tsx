import { PropsWithChildren, useState } from "react";
import { View } from "@tarojs/components";
import bgLanding from "../../../../assets/bg/bg-prayer-schedule.png";
import Mosque from "../../../../assets/ico_mosque_white.svg";
import Compass from "../../../../assets/ico-compass-ramadhan.svg";
import Notification from "../../../../assets/ico-notification-black.svg";
import Pin from "../../../../assets/icon-map-pin-fill.svg";
import RenderVerticalList from "../../../../components/RenderVerticalList/RenderVerticalList";
import BottomSheet from "../../../../components/BottomSheet";
import ReminderSetting from "./components/RamadhanReminderSetting";
import Unmute from "../../../../assets/ico-unmute.svg";
import Stop from "../../../../assets/ico-stop.svg";
import {
  PrayerStatus,
  usePrayerNotification,
} from "../../../../store/ramadhan";
import Show from "../../../../components/Show";
import "./PrayerSchedule.scss";
import useToggle from "../../../../hooks/useToggle";
import DisableConfirmation from "./components/DisableConfirmation";
import { handleNavigate } from "../../../../lib/utils";

interface Prayer {
  id: number;
  name: string;
  time: string;
  status: PrayerStatus;
}

const PrayerSchedule = () => {
  const [selectedData, setSelectedData] = useState<number | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<PrayerStatus>("adzan");
  const { isActive, setIsActive, prayerData } = usePrayerNotification();
  const [pendingToggle, setPendingToggle] = useState<boolean | null>(null);

  const {
    active: reminderSetting,
    toggleActive: toggleOpenReminderSetting,
    setActive: openSheetReminderSetting,
  } = useToggle();

  const {
    active: disabledConfirmation,
    toggleActive: toggleDisabledConfirmation,
  } = useToggle();

  const openReminderSetting = (id: number, status: PrayerStatus) => {
    setSelectedData(id);
    setSelectedStatus(status as PrayerStatus);
    openSheetReminderSetting(true);
  };

  const closeReminderSetting = () => {
    setSelectedData(undefined);
    setSelectedStatus(undefined as unknown as PrayerStatus);
    toggleOpenReminderSetting();
  };

  const confirmDisableNotification = () => {
    if (pendingToggle !== null) {
      setIsActive(pendingToggle);
      setPendingToggle(null);
    }
    toggleDisabledConfirmation();
  };

  const toggleNotification = () => {
    if (isActive) {
      setPendingToggle(false);
      toggleDisabledConfirmation();
    } else {
      setIsActive(true);
    }
  };

  const renderPrayerIconFromStatus = (status: string | undefined) => {
    switch (status) {
      case "adzan":
      case "bedug":
        return (
          <img
            src={Unmute}
            style={{ width: "16px", height: "16px" }}
            alt="Unmute Icon"
          />
        );
      case "notifikasi":
        return (
          <img
            src={Notification}
            style={{ width: "16px", height: "16px" }}
            alt="Notification Icon"
          />
        );
      case "tidak-aktif":
      default:
        return (
          <img
            src={Stop}
            style={{ width: "16px", height: "16px" }}
            alt="Mute Icon"
          />
        );
    }
  };

  const ContainerPrayer = ({ children }: PropsWithChildren) => (
    <View
      style={{
        backgroundImage: `url(${bgLanding})`,
        backgroundSize: "400%",
        backgroundPosition: "top",
      }}
      className="relative bg-no-repeat rounded-b-2xl"
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)",
          zIndex: 1,
        }}
        className="absolute rounded-b-2xl"
      />
      <View className="flex flex-col gap-4 px-4 pt-14 z-10 relative">
        <View className="flex items-center gap-2">
          <img src={Pin} style={{ width: "16px", height: "16px" }} />
          <span className="text-white text-[12px] line-clamp-1">Pancoran</span>
        </View>
        <View className="flex flex-col">
          <span className="text-white font-semibold">Sholat Zuhur - 11:40</span>
          <span className="text-[12px] text-white font-normal">
            1 Jam 59 Menit lagi menuju zuhur
          </span>
        </View>
        <View className="flex gap-2 pb-[56px]">
          <div
            style={{ border: `1px solid white` }}
            className="flex gap-1 border-2 border-white rounded-full px-4 py-2 items-center"
            onClick={() =>
              handleNavigate("/subpackages/subpackage2/pages/CariMasjid/index")
            }
          >
            <span className="text-white font-semibold border-2 border-white text-[12px]">
              Cari Masjid
            </span>
            <img src={Mosque} style={{ width: "16px", height: "16px" }} />
          </div>
          <div
            style={{ border: `1px solid white` }}
            className="flex items-center gap-1  border-2 border-white rounded-full px-4 py-2"
            onClick={() =>
              handleNavigate("/subpackages/subpackage1/pages/ArahKiblat/index")
            }
          >
            <span className="text-white font-semibold border-2 border-white text-[12px]">
              Kiblat
            </span>
            <img src={Compass} style={{ width: "16px", height: "16px" }} />
          </div>
        </View>
      </View>
      <View className="absolute -bottom-10 z-10  w-full ">
        <View className="bg-white py-[22px] px-4 flex items-center justify-between rounded-2xl mx-4">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold">Notifikasi Adzan</span>
            <Show
              when={!!isActive}
              fallbackComponent={
                <span className="text-[10px] text-[#757F90]  font-normal bg-[#EFF1F4] px-3 py-[6px] rounded-lg">
                  Tidak Aktif
                </span>
              }
            >
              <span className="text-[10px] font-normal text-[#008E53] bg-[#008E531A] px-3 py-[6px] rounded-lg">
                Aktif
              </span>
            </Show>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={!!isActive}
              onChange={toggleNotification}
            />
            <span
              className={`slider ${isActive ? "slider-active" : ""}`}
            ></span>
          </label>
        </View>
      </View>
      <div className="absolute py-4 w-full !bg-inactiveGrey">
        <div>{children}</div>
      </div>
    </View>
  );

  return (
    <View className="!bg-inactiveGrey min-h-screen">
      <ContainerPrayer>
        <View className="py-4 px-4 mt-5">
          <View className="bg-blueNavy rounded-t-2xl flex flex-col items-center py-2">
            <span className="text-white font-semibold text-[12px]">
              Rabu, 11 Desember 2024
            </span>
            <span className="text-white font-semibold text-[12px]">
              9 Jumadil Akhir 1446
            </span>
          </View>
          <View className="bg-white flex flex-col rounded-b-2xl">
            <RenderVerticalList data={prayerData} keyIndex="id" pageSize={6}>
              {(data: Prayer, i) => (
                <View key={data.id} className="py-2 px-4">
                  <View
                    className="flex items-center justify-between w-full py-2"
                    style={{
                      borderBottom:
                        i === prayerData.length - 1
                          ? "none"
                          : "1px solid #EFF1F4",
                    }}
                  >
                    <View className="flex items-center gap-2">
                      {renderPrayerIconFromStatus(data.status)}
                      <span className="text-[14px]">{data.name}</span>
                    </View>
                    <View className="flex items-center gap-1">
                      <span className="text-[14px]">{data.time}</span>
                      {isActive ? (
                        <span
                          onClick={() =>
                            openReminderSetting(data.id, data.status)
                          }
                          className="text-[12px] text-primaryRed"
                        >
                          Atur
                        </span>
                      ) : (
                        <span className="text-[12px] text-[#9CA9B9]">Atur</span>
                      )}
                    </View>
                  </View>
                </View>
              )}
            </RenderVerticalList>
          </View>
          <View className="w-full py-2 flex justify-center">
            <span className="text-[10px] text-center text-[#757F90]">
              Sumber Data: Kementrian Agama Republik Indonesia
            </span>
          </View>
        </View>
      </ContainerPrayer>
      <BottomSheet
        showHeader={false}
        open={reminderSetting}
        onClose={closeReminderSetting}
      >
        <ReminderSetting
          toggleModal={toggleOpenReminderSetting}
          currentStatus={selectedStatus}
          id={selectedData}
        />
      </BottomSheet>
      <BottomSheet
        showHeader={false}
        open={disabledConfirmation}
        onClose={toggleDisabledConfirmation}
      >
        <DisableConfirmation
          disableConfirmation={confirmDisableNotification}
          cancelDisable={toggleDisabledConfirmation}
        />
      </BottomSheet>
    </View>
  );
};

export default PrayerSchedule;
