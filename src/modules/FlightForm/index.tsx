// src/components/FlightForm.tsx
import FreemiumFlight from "../../assets/freemium-flight.svg";
import CrownIcon from "../../assets/ico_crown.svg";
import SwapIcon from "../../assets/ico_exchange.svg";
import NotFound from "../../assets/not_found.svg";
import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

import useToggle from "../../hooks/useToggle";
import { cn, handleNavigate } from "../../lib/utils";
import {
  DestinationOriginProps,
  useDestination,
  useIDPlane,
  useOrigin,
  usePlaneDate,
} from "../../store/flight";

import { useFetchFlightByNumber } from "../../network";
import { buttonClick, tabClick } from "../../network/analytics/tracker";
import {
  CMSFlightLandingData,
  FlightByNumberRawData,
} from "../../network/types/response-props";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlightSearch from "../FlightSearch";
import { PackageType, BuyPackageType } from "../../hooks/useUserPackageStatus";
import { serializeParam } from "../../core/serializeParam";
import { toast } from "../../components/ui/use-toast";
import Calendar from "../../components/ui/calendar";
import { View } from "@tarojs/components";

type ActiveSearchInput = "kota-asal" | "kota-tujuan" | string;

interface ContentProps {
  tab: number;
  handleSwap: () => void;
  handleOpenModal: (name: string) => void;
}
interface CalendarModal {
  open: boolean;
  onClose: () => void;
  date?: Date;
  setDate: (date: Date | undefined) => void;
  handleSaveDate: () => void;
}

interface ErrorModal {
  open: boolean;
  onClose: () => void;
}

interface FreemiumModal {
  open: boolean;
  onProceed: () => void;
  onClose: () => void;
  limitType: string;
}

interface Props {
  data?: CMSFlightLandingData;
  viewPageAction?: BuyPackageType;
  remainingQuota?: number;
  packageType?: PackageType;
  userType?: "new" | "old";
  className?: string;
  onOpenCalendar?: () => void;
}

const FlightForm: React.FC<Props> = ({
  data,
  viewPageAction,
  remainingQuota,
  packageType,
  userType,
  className,
  onOpenCalendar,
}) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const [activeSearchInput, setActiveSearchInput] =
    React.useState<ActiveSearchInput>("");

  const {
    active: visibleFlightSearchModal,
    toggleActive: toggleVisibleFlightSearchModal,
  } = useToggle();

  const { active: visibleCalendar, toggleActive: toggleVisibleCalendar } =
    useToggle();

  const { active: visibleError, toggleActive: toggleVisibleError } =
    useToggle();

  const origin = useOrigin((state) => state.origin);
  const destination = useDestination((state) => state.destination);

  const setOrigin = useOrigin((state) => state.setOrigin);
  const setDestination = useDestination((state) => state.setDestination);

  const datePlane = usePlaneDate((state) => state.date);
  const setDatePlane = usePlaneDate((state) => state.setDate);
  const dateFlight = moment(datePlane).format("YYYY-MM-DD");

  const IdPlane = useIDPlane((state) => state.idPlane);

  const { refetch, isFetching } = useFetchFlightByNumber(
    IdPlane,
    dateFlight,
    false
  );

  const toastClassName = "bg-[#181C21] text-white border-[#181C21]";

  /*new user not eligible to view remaining free remaining quotas*/
  const isNewUser = userType === "new";

  /*forbidden means that user already have a package*/
  const isPremium = viewPageAction === "forbidden" && !isNewUser;

  const activeTabClassName = (index: number, tab: number) => {
    return tab === index ? "font-semibold border-rute-active" : "opacity-[0.6]";
  };
  const handleCheckFlight = async () => {
    if (origin === destination)
      return toast({
        description: "Kota asal harus berbeda dengan kota tujuan",
        className: toastClassName,
      });
    buttonClick("Check Flights", "Check Flights", "", window.location.pathname);
    const dateFlight = moment(datePlane).format("YYYY-MM-DD");

    //  const isFreemiumLimit = true put logic in here
    // if(isFreemiumLimit){
    //   toggleOffer()
    // }

    const qParams = serializeParam({
      origin: origin?.city,
      originId: origin?.cityId,
      destination: destination?.city,
      destinationId: destination?.cityId,
      date: dateFlight,
    });

    if (!tab) {
      handleNavigate("/pages/ListPenerbangan/index", `?${qParams}`);
    } else {
      const latestData = await refetch();
      const flightRawData = latestData?.data?.data
        ?.data as unknown as FlightByNumberRawData;

      const isAvailableData = !!flightRawData?.flights;
      const hasMultipleFlights =
        isAvailableData && flightRawData?.flights?.length > 1;

      if (!isAvailableData) {
        return toggleVisibleError();
      } else {
        if (hasMultipleFlights) {
          handleNavigate(
            "/pages/ListPenerbangan/index",
            `?id=${IdPlane}&date=${dateFlight}`,
            { flightsByNumberData: flightRawData }
          );
        } else {
          const foundFlight = flightRawData?.flights[0];
          return handleNavigate(
            "/pages/DetailPenerbangan/index",
            `?id=${IdPlane}&date=${dateFlight}&departure=${foundFlight.departure_code}&arrival=${foundFlight.arrival_code}`
          );
        }
      }
    }
  };

  const handleSwap = () => {
    setDestination(origin);
    setOrigin(destination);
  };

  const handleSelectData = (
    value: DestinationOriginProps,
    name: ActiveSearchInput
  ) => {
    if (name === "kota-asal") return setOrigin(value);
    if (name === "kota-tujuan") return setDestination(value);
  };

  const handleVisibleFlightSearch = (name: string) => {
    toggleVisibleFlightSearchModal();
    setActiveSearchInput(name as ActiveSearchInput);
  };

  const handleToggleBottomSheet = () => {
    // console.log("TOGGLE CLICKED");
    // toggleVisibleCalendar();
    onOpenCalendar?.();
  };
  const handleSaveDate = () => {
    setDatePlane(String(date));
    handleToggleBottomSheet();
  };
  const handleDismissCalendar = () => {
    setDate(moment(datePlane)?.toDate());
    toggleVisibleCalendar();
  };

  const onClickTab = (val: number) => setTab(val);
  const quotaLabel =
    packageType === "unlimited" ? "Unlimited" : `Tersisa ${remainingQuota}x`;

  return (
    <View className="w-[308px] h-[310px]">
      <div className="mt-2">
        {isPremium && (
          <div
            className="bg-gray-800 text-white pb-2 px-4 rounded-t-[20px] h-[50px] text-center gap-2 flex justify-center pt-[8px] relative z-0"
            style={{
              backgroundBlendMode: "color-dodge, normal",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              background: "#479CFF26",
            }}
          >
            <img src={CrownIcon} className="mt-[1px] w-[15px] h-[12px]" />
            <span className="font-sans text-[10px] text-white font-semibold">
              {`${quotaLabel} Ikuti Penerbangan`}
            </span>
          </div>
        )}
      </div>
      <View>
        <div
          className={`p-4 shadow-md rounded-2xl relative z-1 ${
            isPremium ? "mt-[-36px]" : "mt-0"
          } ${className}`}
          style={{
            backgroundBlendMode: "color-dodge, normal",
            //  backdropFilter: "blur(12px)",
            //WebkitBackdropFilter: "blur(12px)",
            background: "rgb(128, 133, 148)",
            height: isPremium ? 317 : 350,
          }}
        >
          <div className="mb-4 flex gap-[10px] z-1 relative">
            <div
              className={cn(
                activeTabClassName(0, tab),
                "text-rute-active pb-0 text-sm w-1/2 cursor-pointer bg-transparent justify-center flex-row text-center"
              )}
              onClick={() => {
                onClickTab(0);
                tabClick(data?.formTabTitle1, "", window.location.pathname);
              }}
            >
              {data?.formTabTitle1}
              {!tab ? (
                <div className={"border-b-2 w-1/4 mx-auto mt-1 rounded-2xl"} />
              ) : null}
            </div>

            <div
              className={cn(
                activeTabClassName(1, tab),
                "text-white pb-0 text-sm w-1/2 cursor-pointer bg-transparent justify-center flex-row text-center"
              )}
              onClick={() => {
                onClickTab(1);
                tabClick(data?.formTabTitle2, "", window.location.pathname);
              }}
            >
              {data?.formTabTitle2}
              {tab ? (
                <div className={"border-b-2 w-1/4 mx-auto mt-1 rounded-2xl"} />
              ) : null}
            </div>
          </div>

          <Content
            tab={tab}
            handleSwap={handleSwap}
            handleOpenModal={handleVisibleFlightSearch}
          />
          <div className="mb-4 flex-row flex items-center bg-white rounded-2xl p-4">
            <InputField
              id="tanggal"
              parentClassName="w-full"
              placeholder="Tanggal"
              type={"text"}
              value={
                datePlane ? moment(datePlane).format("DD MMM YYYY") : undefined
              }
              caretColor="caret-transparent"
              readOnly={true}
              // onFocus={() => toggleVisibleCalendar()}
              onClick={handleToggleBottomSheet}
              autoComplete="off"
            />
          </div>

          <Button
            disabled={
              !tab
                ? !(origin && destination && datePlane) || isFetching
                : !(datePlane && IdPlane) || isFetching
            }
            label="Cek Penerbangan"
            onClick={handleCheckFlight}
          />
        </div>
      </View>

      <FlightSearch
        open={visibleFlightSearchModal}
        onClose={toggleVisibleFlightSearchModal}
        onSelect={handleSelectData}
        name={activeSearchInput}
        dataPopularCities={data?.popularCitiesSection ?? []}
      />
      {/* <CalendarModal
        open={visibleCalendar}
        onClose={handleDismissCalendar}
        handleSaveDate={handleSaveDate}
        setDate={setDate}
        date={date}
      /> */}
      <EmptyModal onClose={toggleVisibleError} open={visibleError} />
    </View>
  );
};

export default FlightForm;

const Content = ({ tab, handleSwap, handleOpenModal }: ContentProps) => {
  const origin = useOrigin((state) => state.origin);
  const setOrigin = useOrigin((state) => state.setOrigin);
  const destination = useDestination((state) => state.destination);
  const setDestination = useDestination((state) => state.setDestination);
  const IdPlane = useIDPlane((state) => state.idPlane);
  const setIdPlane = useIDPlane((state) => state.setIdPlane);

  const handleClick = () => {
    buttonClick("Switch", "Switch City", "", window.location.pathname);
    handleSwap();
  };

  if (!tab) {
    return (
      <div className="mb-4 flex-row flex items-center bg-white rounded-2xl p-4">
        <div className={"w-11/12"}>
          <InputField
            id="kota-asal"
            placeholder="Kota Asal"
            value={origin?.city}
            caretColor="caret-transparent"
            autoComplete="off"
            readOnly={true}
            onClick={() => {
              handleOpenModal("kota-asal");
              buttonClick(
                "Origin City",
                "Navigate to Popular City Page",
                "",
                window.location.pathname
              );
            }}
            onChange={() =>
              setOrigin({
                ...origin,
                city: (document.getElementById("kota-asal") as HTMLInputElement)
                  ?.value,
              })
            }
          />
          <div className="h-[1px] bg-[#DAE0E9] rounded-sm my-2" />
          <InputField
            id="kota-tujuan"
            placeholder="Kota Tujuan"
            autoComplete="off"
            value={destination?.city}
            caretColor="caret-transparent"
            readOnly={true}
            onClick={() => {
              handleOpenModal("kota-tujuan");
              buttonClick(
                "Destination City",
                "Navigate to Popular City Page",
                "",
                window.location.pathname
              );
            }}
            onChange={() =>
              setDestination({
                ...destination,
                city: (
                  document.getElementById("kota-tujuan") as HTMLInputElement
                )?.value,
              })
            }
          />
        </div>
        <div className="ml-4">
          <img
            src={SwapIcon}
            alt="swap-icon"
            className="cursor-pointer w-[27.83px] h-[27.83px]"
            onClick={handleClick}
          />
        </div>
        <></>
      </div>
    );
  } else {
    return (
      <div className="mb-4 flex-row flex items-center bg-white rounded-2xl p-4">
        <InputField
          id="id-pesawat"
          parentClassName="w-full"
          placeholder="Masukkan ID Pesawat"
          type={"text"}
          value={IdPlane}
          caretColor="caret-inherit"
          onChange={() =>
            setIdPlane(
              (document.getElementById("id-pesawat") as HTMLInputElement)?.value
            )
          }
        />
      </div>
    );
  }
};

export const CalendarModal = ({
  open,
  onClose,
  date,
  setDate,
  handleSaveDate,
}: CalendarModal) => {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <Calendar
        // mode="single"
        // selected={date}
        onSelect={(val) => val && setDate(val)}
        //defaultMonth={moment(date).isValid() ? date : undefined}
        //className={"flex justify-center items-center"}
        // disabled={{ before: new Date() }}
        // fromMonth={new Date()}
      />
      <div className={"flex mx-2 justify-center"}>
        <Button
          label="Simpan"
          className="mx-4 mt-3 mb-5"
          onClick={handleSaveDate}
        />
      </div>
    </BottomSheet>
  );
};

const EmptyModal = ({ open, onClose }: ErrorModal) => {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="flex justify-center flex-col text-center items-center">
        <img src={NotFound} className="mt-1" />
        <span className="text-base font-semibold font-sans mt-1">
          Penerbangan tidak ditemukan
        </span>
        <span className="text-grey text-xs font-normal font-sans whitespace-pre my-1">
          {`Silakan cek kembali kode penerbangan\nyang kamu input`}
        </span>
      </div>

      <div className={"flex mx-2 justify-center"}>
        <Button label="Kembali" className="mx-4 mt-3 mb-5" onClick={onClose} />
      </div>
    </BottomSheet>
  );
};

export const FreemiumLimitModal = ({
  open,
  onClose,
  onProceed,
  limitType,
}: FreemiumModal) => {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="flex justify-center flex-col text-center items-center">
        <img src={FreemiumFlight} className="my-2 w-[121.86px] h-[99.247px]" />
        <span className="text-[16px] font-semibold font-sans mt-2 max-w-[332px]">
          Nikmati fitur ikuti penerbangan dan info penerbangan terkini
        </span>
        <span className="text-grey text-xs font-normal font-sans whitespace-pre my-1">
          {`Kamu sudah mencapai batas ${limitType} pencarian,\nyuk langganan untuk nikmati fitur ini`}
        </span>
      </div>

      <div className={"flex mx-2 justify-center"}>
        <Button
          label="Lihat Paket Langganan"
          className="mx-4 mt-3 mb-5"
          onClick={() => {
            buttonClick(
              "See Subscription Packages",
              "See Subscription Packages",
              "",
              window.location.pathname
            );
            onProceed();
          }}
        />
      </div>
    </BottomSheet>
  );
};
