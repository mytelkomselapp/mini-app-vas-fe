import { PropsWithChildren, useEffect, useState } from "react";
import { View } from "@tarojs/components";
import bgLanding from "../../../../assets/bg/bg-prayer-schedule.png";

import bgSubuh from "../../../../assets/bg/bg-subuh.png";
import bgZuhur from "../../../../assets/bg/bg-zuhur.png";
import bgMagrib from "../../../../assets/bg/bg-magrib.png";
import bgIsya from "../../../../assets/bg/bg-isya.png";

import Mosque from "../../../../assets/ico_mosque_white.svg";
import Compass from "../../../../assets/ico-compass-ramadhan.svg";
import ChevronDown from "../../../../assets/chevron-down-white.svg";
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
  useRamadhanSearchLocation,
} from "../../../../store/ramadhan";
import Show from "../../../../components/Show";
import "./PrayerSchedule.scss";
import useToggle from "../../../../hooks/useToggle";
import DisableConfirmation from "./components/DisableConfirmation";
import {
  formatDateToIndonesian,
  gregorianToHijri,
  handleNavigate,
} from "../../../../lib/utils";
import Taro from "@tarojs/taro";
import {
  useGlobalNotificationConfig,
  useNotificationConfig,
  usePostRegisterUser,
} from "../../../../network";
import { PrayerCardProps } from "@/pages/LandingPageRamadan/components/PrayerCard";
import { PrayerNotificationConfig } from "@/network/types/response-props";

interface Prayer {
  id: number;
  name: string;
  time: string;
  status: PrayerStatus;
  isReminderActive?: boolean;
  reminderTime?: number;
}

const PrayerSchedule = () => {
  const [selectedData, setSelectedData] = useState<
    { id: number; name: string; time: number } | undefined
  >();
  const [selectedStatus, setSelectedStatus] = useState<PrayerStatus>("adzan");
  const {
    isActive,
    setIsActive,
    prayerData,
    setPrayerData,
    updatePrayerStatus,
  } = usePrayerNotification();
  const [pendingToggle, setPendingToggle] = useState<boolean | null>(null);
  const [latitude, setLatitude] = useState<string>("0");
  const [longitude, setLongitude] = useState<string>("0");
  const { data: dataRamadhanSearchLocation } = useRamadhanSearchLocation();
  const {
    active: reminderSetting,
    toggleActive: toggleOpenReminderSetting,
    setActive: openSheetReminderSetting,
  } = useToggle();

  const {
    active: disabledConfirmation,
    toggleActive: toggleDisabledConfirmation,
  } = useToggle();
  const { dayName, day, monthName, year } = formatDateToIndonesian(new Date()); // Format date in Indonesian
  // const currentDay = moment()?.format("dddd, DD MMMM YYYY");
  const currentDay = `${dayName}, ${day} ${monthName} ${year}`;
  const hijrDate = gregorianToHijri(new Date());

  const {
    mutateAsync: doRegisterUser,
    isLoading: isLoadingRegisterUser,
    data: dataRawRegisterUser,
  } = usePostRegisterUser();

  const {
    data: notificationConfigDataRaw,
    isLoading: isLoadingNotificationConfig,
    refetch: refetchNotificationConfig,
  } = useNotificationConfig(false);

  const {
    mutateAsync: doGlobalNotificationConfig,
    isLoading: isLoadingGlobalConfig,
    data: dataRawGlobalConfig,
  } = useGlobalNotificationConfig();

  const dataRegisterUser = dataRawRegisterUser?.data?.data;
  const notificationConfigData = notificationConfigDataRaw?.data?.data;

  const city = dataRegisterUser?.city?.city ?? "-";
  const nearestPrayerTime =
    (dataRegisterUser?.nearest_pray_time as PrayerCardProps) ?? {};
  const prayTime = nearestPrayerTime?.pray_time;
  const salatLabel = !nearestPrayerTime?.name_time?.includes("Imsyak")
    ? "Sholat" + " " + nearestPrayerTime?.name_time
    : nearestPrayerTime?.name_time;
  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    await getLocation();
    const resultNotif = await refetchNotificationConfig();

    const result = await doRegisterUser({ latitude, longitude });

    if (!isLoadingRegisterUser) {
      getPrayerSchedule(result?.data?.data, resultNotif?.data?.data?.data);
      setIsActive(result?.data?.data?.notification_status === "ON");
    }
  };

  const getBgImage = (time: string) => {
    switch (time) {
      case "imsyak":
      case "subuh":
        Taro.setNavigationBarColor({
          frontColor: "#ffffff", // Text color
          backgroundColor: "#084d75", // Background color
          animation: {
            duration: 0,
            timingFunc: "easeIn",
          },
        });
        return bgSubuh;
      case "dzuhur":
      case "ashar":
        Taro.setNavigationBarColor({
          frontColor: "#ffffff", // Text color
          backgroundColor: "#689df6", // Background color
          animation: {
            duration: 0,
            timingFunc: "easeIn",
          },
        });
        return bgZuhur;
      case "maghrib":
        Taro.setNavigationBarColor({
          frontColor: "#ffffff", // Text color
          backgroundColor: "#a72f1f", // Background color
          animation: {
            duration: 0,
            timingFunc: "easeIn",
          },
        });
        return bgMagrib;
      case "isya":
        Taro.setNavigationBarColor({
          frontColor: "#ffffff", // Text color
          backgroundColor: "#203578", // Background color
          animation: {
            duration: 0,
            timingFunc: "easeIn",
          },
        });
        return bgIsya;
      default:
        return bgLanding;
    }
  };

  const getPrayerSchedule = async (val, valNotif) => {
    const prayerSchedule = await val?.prayer_schedule;

    const preprocessedPrayerSchedule = [
      {
        id: 1,
        name: "Imsak",
        time: prayerSchedule?.imsyak,
        status:
          valNotif?.imsyak?.notification_status === "ON"
            ? "notifikasi"
            : ("tidak-aktif" as PrayerStatus),
        isReminderActive: valNotif?.imsyak?.notification_status === "ON",
        reminderTime: valNotif?.imsyak?.pre_notification_time,
      },
      {
        id: 2,
        name: "Subuh",
        time: prayerSchedule?.subuh,
        status:
          valNotif?.subuh?.notification_status === "ON"
            ? "notifikasi"
            : ("tidak-aktif" as PrayerStatus),
        isReminderActive: valNotif?.subuh?.notification_status === "ON",
        reminderTime: valNotif?.subuh?.pre_notification_time,
      },
      {
        id: 3,
        name: "Zuhur",
        time: prayerSchedule?.dzuhur,
        status:
          valNotif?.dzuhur?.notification_status === "ON"
            ? "notifikasi"
            : ("tidak-aktif" as PrayerStatus),
        isReminderActive: valNotif?.dzuhur?.notification_status === "ON",
        reminderTime: valNotif?.dzuhur?.pre_notification_time,
      },
      {
        id: 4,
        name: "Ashar",
        time: prayerSchedule?.ashar,
        status:
          valNotif?.ashar?.notification_status === "ON"
            ? "notifikasi"
            : ("tidak-aktif" as PrayerStatus),
        isReminderActive: valNotif?.ashar?.notification_status === "ON",
        reminderTime: valNotif?.ashar?.pre_notification_time,
      },
      {
        id: 5,
        name: "Maghrib",
        time: prayerSchedule?.maghrib,
        status:
          valNotif?.magrib?.notification_status === "ON"
            ? "notifikasi"
            : ("tidak-aktif" as PrayerStatus),
        isReminderActive: valNotif?.maghrib?.notification_status === "ON",
        reminderTime: valNotif?.magrib?.pre_notification_time,
      },
      {
        id: 6,
        name: "Isya",
        time: prayerSchedule?.isya,
        status:
          valNotif?.isya?.notification_status === "ON"
            ? "notifikasi"
            : ("tidak-aktif" as PrayerStatus),
        isReminderActive: valNotif?.isya?.notification_status === "ON",
        reminderTime: valNotif?.isya?.pre_notification_time,
      },
    ];
    setPrayerData(preprocessedPrayerSchedule);
  };

  const getLocation = () => {
    Taro.getLocation({
      type: "wgs84",
      success: (res) => {
        console.log({ res });
        setLatitude(res?.latitude?.toString());
        setLongitude(res?.longitude?.toString());
      },
    });
  };

  const openReminderSetting = (
    id: number,
    status: PrayerStatus,
    name: string,
    time: number
  ) => {
    setSelectedData({ id, name, time });
    setSelectedStatus(status as PrayerStatus);
    openSheetReminderSetting(true);
  };

  const closeReminderSetting = () => {
    setSelectedData(undefined);
    setSelectedStatus(undefined as unknown as PrayerStatus);
    toggleOpenReminderSetting();
  };

  const confirmDisableNotification = async () => {
    if (pendingToggle !== null) {
      const valueNotification = isActive ? "ON" : "OFF";
      const result = await doGlobalNotificationConfig({
        notification: valueNotification,
      });
      console.log({ resultConfig: result });
      setIsActive(pendingToggle);
      setPendingToggle(null);
    }
    toggleDisabledConfirmation();
  };

  const toggleNotification = async () => {
    const valueNotification = isActive ? "ON" : "OFF";

    if (isActive) {
      setPendingToggle(false);
      toggleDisabledConfirmation();
    } else {
      const result = await doGlobalNotificationConfig({
        notification: valueNotification,
      });
      console.log({ toggleOn: result });
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
            style={{ width: "16px", height: "20px" }}
            alt="Unmute Icon"
          />
        );
      case "notifikasi":
        return (
          <img
            src={Notification}
            style={{ width: "16px", height: "20px" }}
            alt="Notification Icon"
          />
        );
      case "tidak-aktif":
      default:
        return (
          <img
            src={Stop}
            style={{ width: "16px", height: "20px" }}
            alt="Mute Icon"
          />
        );
    }
  };

  const ContainerPrayer = ({ children }: PropsWithChildren) => (
    <View
      style={{
        backgroundImage: `url(${getBgImage(
          nearestPrayerTime?.name_time?.toLowerCase()
        )})`,
        backgroundSize: "cover",
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
        <View
          className="flex items-center gap-2"
          onClick={() =>
            handleNavigate(
              "/subpackages/subpackage3/pages/RamadhanSearchLocation/index"
            )
          }
        >
          <img src={Pin} style={{ width: "16px", height: "16px" }} />
          <span className="text-white text-[12px] line-clamp-1">
            {/* {dataRamadhanSearchLocation?.city || "Pancoran"} */}
            {city}
          </span>
          <img
            src={ChevronDown}
            style={{ width: "10.67px", height: "5.33px" }}
          />
        </View>
        <View className="flex flex-col">
          <span className="text-white font-semibold">
            {salatLabel} - {prayTime}
          </span>
          <span className="text-[12px] text-white font-normal">
            {nearestPrayerTime?.nearest_pray_info}
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
              handleNavigate(
                "/subpackages/subpackage1/pages/ArahKiblat/index",
                "",
                dataRegisterUser?.city
              )
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
      <Show when={!isLoadingRegisterUser}>
        <ContainerPrayer>
          <View className="py-4 px-4 mt-5">
            <View className="flex justify-center items-center pt-1 pb-3">
              <View className="h-[1px] bg-dividerGrey w-[25%] mr-2" />
              <View className="flex flex-col justify-center items-center gap-1">
                <span className="text-primaryBlack font-semibold text-[12px]">
                  {currentDay}
                </span>

                <span className="text-primaryBlack text-[10px]">
                  {hijrDate?.day + " " + hijrDate?.month + " " + hijrDate?.year}
                </span>
              </View>
              <View className="h-[1px] bg-dividerGrey w-[25%] ml-2" />
            </View>
            <View>
              <RenderVerticalList data={prayerData} keyIndex="id" pageSize={6}>
                {(data: Prayer, i) => (
                  <View
                    key={data.id}
                    className={`py-2 px-4 rounded-2xl bg-white mb-2 ${
                      isActive ? "opacity-100" : "opacity-45"
                    } `}
                    onClick={() =>
                      isActive
                        ? openReminderSetting(
                            data?.id,
                            data.status,
                            data?.name,
                            Number(data?.reminderTime)
                          )
                        : null
                    }
                  >
                    <View className="flex items-center justify-between w-full py-2">
                      <View className="flex items-center gap-2">
                        <span className="text-[14px]">{data.name}</span>
                      </View>
                      <View className="flex items-center gap-4">
                        <span className="text-[14px]">{data.time}</span>
                        {renderPrayerIconFromStatus(data.status)}
                      </View>
                    </View>
                  </View>
                )}
              </RenderVerticalList>
            </View>
            <View className="w-full flex justify-center">
              <span className="text-[10px] text-center text-[#757F90]">
                Sumber Data: Kementrian Agama Republik Indonesia
              </span>
            </View>
          </View>
        </ContainerPrayer>
      </Show>
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
