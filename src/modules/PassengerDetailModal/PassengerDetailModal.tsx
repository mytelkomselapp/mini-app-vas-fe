import React, { useState } from "react";
import BottomSheet from "../..//..//../components/BottomSheet";
import { ReactComponent as IconCalendar } from "../..//..//../assets/ico_calendar.svg";
import { useNavigate } from "react-router-dom";
import Button from "../..//..//../components/Button";
import { Switch } from "../..//..//../components/ui/switch";
import moment from "moment";
import useToggle from "../..//..//../hooks/useToggle";
import { CalendarModal } from "../..//..//../modules/FlightForm";
import { usePassengers } from "../..//..//../store/travel";
import Checkbox from "../..//..//../components/Checkbox";
import Show from "../..//..//../components/Show";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PassengerDetailModal: React.FC<Props> = ({ open, onClose }) => {
  const { passengers, setPassenger } = usePassengers();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [0, 1, 2];
  const nationalities = ["Indonesia", "WNA"];
  const salutations = ["Tuan", "Nyonya", "Nona"];

  const currentPassenger = passengers[activeTab] || {
    salutation: salutations[0],
    nationality: nationalities[0],
  };

  const [isSingleWordName, setIsSingleWordName] = useState(false);
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [date, setDate] = useState<Date | undefined>();

  const isCurrentPassengerComplete = () => {
    // Check if all required fields for the current passenger are filled
    const passengerFields = [
      "salutation",
      "firstName",
      "birthDate",
      "nationality",
    ];
    return passengerFields.every(
      (field) =>
        currentPassenger[field as keyof typeof currentPassenger] !==
          undefined &&
        currentPassenger[field as keyof typeof currentPassenger]
          ?.toString()
          .trim() !== ""
    );
  };

  const handleTabChange = (index: number) => {
    if (
      (isCurrentPassengerComplete() && index > activeTab) ||
      index < activeTab
    ) {
      setActiveTab(index);
    }
  };

  const {
    active: visibleCalendarModal,
    toggleActive: toggleVisibleCalendarModal,
  } = useToggle();

  const handleOpenCalendarModal = () => {
    toggleVisibleCalendarModal();
  };

  const handleSaveDate = () => {
    setPassenger(activeTab, { ...currentPassenger, birthDate: date });
    toggleVisibleCalendarModal();
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event?.target?.name ?? "";
    const inputValues = event?.target?.value ?? "";

    if (inputName === "firstName") {
      return setPassenger(activeTab, {
        ...currentPassenger,
        firstName: inputValues,
      });
    }
    if (inputName === "lastName") {
      return setPassenger(activeTab, {
        ...currentPassenger,
        lastName: inputValues,
      });
    }
  };

  const handleChangeSalutation = (salutation: string) => {
    return setPassenger(activeTab, { ...currentPassenger, salutation });
  };

  const handleOnSave = () => {
    if (activeTab === tabs.length - 1) {
      navigate("/travel/order-review");
    }
    setActiveTab(activeTab + 1);
  };

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="flex flex-col items-center gap-y-2 p-[16px] mt-2 w-full">
        <h1 className="text-base font-semibold mb-1">Detail Penumpang</h1>
      </div>

      <div className="w-full px-4 py-3 bg-solidRed bg-opacity-5 mb-4">
        <p className="text-sm">
          Pastikan nama setiap penumpang sama dengan yang ada di kartu identitas
          (KTP/Paspor/SIM) kamu.
        </p>
      </div>

      <div
        className="overflow-auto no-scrollbar flex w-auto max-w-[90%] whitespace-nowrap"
        id="scroll-price"
      >
        {tabs?.map((i) => {
          const isSelected = activeTab === i;
          return (
            <div
              key={i}
              className={`bg-white rounded-t-2xl p-2 text-center ${
                isSelected ? "border-b-[1px] border-textError" : ""
              }`}
              onClick={() => handleTabChange(i)}
            >
              <p
                className={`${
                  isSelected ? "text-textError font-semibold" : ""
                }`}
              >
                Penumpang {i + 1}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-y-2 p-[16px] mt-2 w-full">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs">Sama dengan Pemesan</span>
          <Switch
            id="airplane-mode"
            className="data-[state=checked]:bg-blueNavy data-[state=checked]:border-blueNavy data-[state=unchecked]:bg-inputGroup border-[#DAE0E9] border-2"
            checked={isRoundTrip}
            onCheckedChange={setIsRoundTrip}
          />
        </div>

        <div className="flex flex-start mb-4 gap-x-4">
          {salutations.map((sal, index) => (
            <div
              key={index}
              className="flex gap-x-2"
              onClick={() => handleChangeSalutation(sal)}
            >
              <input
                type="radio"
                name="salutation"
                checked={sal === currentPassenger?.salutation}
                className="accent-black w-5 h-5"
              />
              <span className="text-sm">{sal}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col mb-4 gap-y-2">
          <span className="text-textSecondary text-xs">Nama Depan</span>
          <input
            readOnly={false}
            value={currentPassenger?.firstName || ""}
            name="firstName"
            type="text"
            className="h-[50px] text-sm w-full outline-none rounded-[12px] border px-4 border-gray-300"
            placeholder="Masukkan nama depan di sini"
            onChange={handleChangeInput}
          />
        </div>

        <div className="flex mb-4 gap-x-2">
          <Checkbox
            checked={isSingleWordName}
            onClick={() => setIsSingleWordName(!isSingleWordName)}
          />
          <span className="text-xs">Nama hanya memiliki satu kata</span>
        </div>

        <Show when={!isSingleWordName}>
          <div className="flex flex-col  mb-4 gap-y-2">
            <span className="text-textSecondary text-xs">Nama Belakang</span>
            <input
              readOnly={false}
              value={currentPassenger?.lastName || ""}
              name="lastName"
              type="text"
              className="h-[50px] text-sm w-full outline-none rounded-[12px] border px-4 border-gray-300"
              placeholder="Masukkan nama belakang di sini"
              onChange={handleChangeInput}
            />
          </div>
        </Show>

        <div className="flex flex-col mb-4 gap-y-2">
          <span className="text-textSecondary text-xs">Tanggal Lahir</span>
          <div className="flex justify-between items-center relative ">
            <input
              value={
                !!currentPassenger?.birthDate
                  ? moment(currentPassenger.birthDate).format("DD MMM YYYY")
                  : ""
              }
              readOnly
              name="departureDate"
              type="text"
              className="h-[50px] text-sm w-full outline-none rounded-[12px] border px-4 border-gray-300"
              placeholder="Pilih tanggal"
              onClick={handleOpenCalendarModal}
            />
            <IconCalendar
              className="absolute right-4 cursor-pointer"
              onClick={handleOpenCalendarModal}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 gap-y-2">
          <span className="text-textSecondary text-xs">Kewarganegaraan</span>
          <select
            value={currentPassenger?.nationality || ""}
            name="nationality"
            className="h-[50px] text-sm w-full outline-none rounded-[12px] border px-4 border-gray-300 appearance-none"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setPassenger(activeTab, {
                ...currentPassenger,
                nationality: event.target.value,
              });
            }}
          >
            {nationalities.map((nationality, index) => (
              <option key={index} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
        </div>

        <Button
          label="Simpan"
          onClick={handleOnSave}
          disabled={!isCurrentPassengerComplete()}
        />
      </div>

      <CalendarModal
        open={visibleCalendarModal}
        onClose={toggleVisibleCalendarModal}
        setDate={setDate}
        date={currentPassenger?.birthDate || date}
        handleSaveDate={handleSaveDate}
      />
    </BottomSheet>
  );
};

export default PassengerDetailModal;
