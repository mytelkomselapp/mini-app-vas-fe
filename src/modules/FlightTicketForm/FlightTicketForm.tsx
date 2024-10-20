import * as React from "react";
import { ReactComponent as IconCalendar } from "../../assets/ico_calendar.svg";
import { useFlightTicketForm } from "../../store/flight";
import useToggle from "../../hooks/useToggle";
import { CalendarModal } from "../FlightForm";
import moment from "moment";
import { cn } from "../../lib/utils";

interface Props {
  pageMode: "detail" | "create";
}

const FlightTicketForm: React.FC<Props> = ({ pageMode }) => {
  const {
    ticketName,
    departureDate,
    planeNo,
    error,
    setTicketName,
    setDepartureDate,
    setPlaneNo,
    setError,
  } = useFlightTicketForm();

  const {
    active: visibleCalendarModal,
    toggleActive: toggleVisibleCalendarModal,
  } = useToggle();

  const [date, setDate] = React.useState<Date | undefined>();

  const isDetailMode = pageMode === "detail";

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event?.target?.name ?? "";
    const inputValues = event?.target?.value ?? "";

    if (inputName === "ticketName") {
      setError({ ...error, ticketName: "" });
      return setTicketName(inputValues);
    }
    if (inputName === "planeNo") {
      setError({ ...error, planeNo: "" });
      return setPlaneNo(inputValues);
    }
  };

  const handleOpenCalendarModal = () => {
    toggleVisibleCalendarModal();
  };

  const handleSaveDate = () => {
    setError({ ...error, departureDate: "" });
    setDepartureDate(String(date));
    toggleVisibleCalendarModal();
  };

  return (
    <div>
      <input
        readOnly={isDetailMode}
        value={ticketName}
        name="ticketName"
        type="text"
        className={`h-[50px] text-sm w-full outline-none rounded-[12px] border px-4 ${
          error.ticketName ? "mb-2 border-solidRed" : "mb-4 border-gray-300"
        }`}
        placeholder="Nama Tiket"
        onChange={isDetailMode ? undefined : handleChangeInput}
      />
      {error.ticketName && (
        <div className="text-solidRed text-xs mb-4">{error.ticketName}</div>
      )}

      <div
        className={`flex justify-between items-center relative ${
          error.departureDate ? "mb-2" : "mb-4"
        }`}
      >
        <input
          value={
            !!departureDate ? moment(departureDate).format("DD MMM YYYY") : ""
          }
          readOnly
          name="departureDate"
          type="text"
          className={`h-[50px] text-sm w-full outline-none rounded-[12px] border px-4 ${
            error.departureDate ? "border-solidRed" : "border-gray-300"
          }`}
          placeholder="Tanggal Pergi"
          onClick={isDetailMode ? undefined : handleOpenCalendarModal}
        />
        <IconCalendar
          className="absolute right-4 cursor-pointer"
          onClick={isDetailMode ? undefined : handleOpenCalendarModal}
        />
      </div>
      {error.departureDate && (
        <div className="text-solidRed text-xs mb-4">{error.departureDate}</div>
      )}

      <input
        value={planeNo}
        readOnly={isDetailMode}
        name="planeNo"
        type="text"
        className={`h-[50px] text-sm w-full outline-none rounded-[12px] border px-4 ${
          error.planeNo ? "mb-2 border-solidRed" : "mb-4 border-gray-300"
        }`}
        placeholder="ID Pesawat"
        onChange={isDetailMode ? undefined : handleChangeInput}
      />
      {error.planeNo && (
        <div className="text-solidRed text-xs mb-4">{error.planeNo}</div>
      )}

      <CalendarModal
        open={visibleCalendarModal}
        onClose={toggleVisibleCalendarModal}
        setDate={setDate}
        date={date}
        handleSaveDate={handleSaveDate}
      />
    </div>
  );
};

export default FlightTicketForm;
