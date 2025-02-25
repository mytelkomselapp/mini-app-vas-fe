import { useState, useEffect } from "react";
import { RadioGroup } from "@tarojs/components";
import Button from "../../../../../../components/Button";
import Unmute from "../../../../../../assets/ico-unmute.svg";
import Stop from "../../../../../../assets/ico-stop.svg";
import Notification from "../../../../../../assets/ico-notification-black.svg";
import {
  PrayerStatus,
  usePrayerNotification,
} from "../../../../../../store/ramadhan";
import Chips from "../../../../../../components/Chips";
import "./ReminderSetting.scss";
import { usePostNotificationConfig } from "../../../../../../network";

type idType = { id: number; name: string; time: number };
interface ReminderSettingProps {
  id: idType | undefined;
  currentStatus: PrayerStatus;
  toggleModal: () => void;
  onRefresh: () => void; // Add the callback function prop
}

const ReminderSetting = ({
  id,
  currentStatus,
  toggleModal,
  onRefresh,
}: ReminderSettingProps) => {
  const [selectedOption, setSelectedOption] =
    useState<PrayerStatus>(currentStatus);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const preNotificationTime = parseInt(
    selectedChip?.replace(" Menit", "") || ""
  );
  const { updatePrayerStatus } = usePrayerNotification();
  const {
    mutateAsync: doPostNotifConfig,
    data: postNotifData,
    isLoading: isLoadingPostNotifData,
  } = usePostNotificationConfig();

  const handleOptionChange = (value: PrayerStatus) => {
    setSelectedOption(value);
  };

  const handleSubmit = () => {
    if (id !== undefined) {
      doPostNotifConfig({
        config_name: id?.name?.toLowerCase() + "_config",
        notification_status: selectedOption === "notifikasi" ? "ON" : "OFF",
        pre_notification_time: preNotificationTime,
      });
      onRefresh(); // Trigger the callback function

      updatePrayerStatus(id?.id, selectedOption);
      toggleModal();
    }
  };

  const handleChipClick = (value: string) => {
    setSelectedChip(value);
  };

  const toggleNotification = () => {
    if (preNotificationTime) {
      setSelectedChip(0 + " Menit");
    } else {
      setSelectedChip(5 + " Menit");
    }
  };

  useEffect(() => {
    setSelectedOption(currentStatus);
    setSelectedChip(id?.time + " Menit");
  }, [currentStatus, id]);

  return (
    <>
      <div className="text-center text-base font-semibold">
        {"Pengingat Waktu" + " " + id?.name}
      </div>
      <RadioGroup className="flex flex-col">
        {[
          // { label: "Suara Adzan", value: "adzan", icon: Unmute },
          // { label: "Suara Bedug", value: "bedug", icon: Unmute },
          { label: "Notifikasi", value: "notifikasi", icon: Notification },
          { label: "Tidak Aktif", value: "tidak-aktif", icon: Stop },
        ].map((option) => (
          <label
            onClick={() => handleOptionChange(option.value as PrayerStatus)}
            key={option.value}
            className="flex items-center justify-between gap-4 ctive:bg-transparent active:text-current"
          >
            <div className="flex items-center gap-2">
              <img
                src={option.icon}
                alt={option.label}
                style={{ width: "24px", height: "24px" }}
              />
              <span className="text-base py-4">{option.label}</span>
            </div>
            <div
              className={`custom-radio-button ${
                selectedOption === option.value ? "selected" : ""
              }`}
            >
              <div
                className={`checked-dot ${
                  selectedOption === option.value ? "checked" : ""
                }`}
              ></div>
            </div>
          </label>
        ))}
      </RadioGroup>
      <div className="mt-4">
        <div className="flex justify-between">
          <span className="text-sm font-semibold text-primaryBlack mb-2">
            {"Pengingat Sebelum" + " " + id?.name}
          </span>
          <label className="switch">
            <input
              type="checkbox"
              checked={!!preNotificationTime}
              onChange={toggleNotification}
            />
            <span
              className={`slider ${
                !!preNotificationTime ? "slider-active" : ""
              }`}
            ></span>
          </label>
        </div>
        <div className="flex gap-2">
          <Chips
            text="5 Menit"
            textColor={selectedChip === "5 Menit" ? "white" : undefined}
            bgColor={selectedChip === "5 Menit" ? "#001A41" : undefined}
            onClick={handleChipClick}
          />
          <Chips
            text="10 Menit"
            textColor={selectedChip === "10 Menit" ? "white" : undefined}
            bgColor={selectedChip === "10 Menit" ? "#001A41" : undefined}
            onClick={handleChipClick}
          />
          <Chips
            text="15 Menit"
            textColor={selectedChip === "15 Menit" ? "white" : undefined}
            bgColor={selectedChip === "15 Menit" ? "#001A41" : undefined}
            onClick={handleChipClick}
          />
        </div>
      </div>
      <div className="mt-4">
        <Button label="Simpan" onClick={handleSubmit} className="border-0" />
      </div>
    </>
  );
};

export default ReminderSetting;
