import React, { PropsWithChildren } from "react";
import Navbar from "../../components/Navbar";
import bgFlight from "../../assets/bg/bg-flight-specific.png";
import TravelFlightForm from "../../modules/TravelFlightForm";
import { CalendarModal } from "../../modules/FlightForm";
import BottomSheet from "../../components/BottomSheet";
import { AutoCompleteDropdownOptionProps } from "../../components/AutocompleteInput/components/Dropdown/Dropdown";
import { DUMMY_DATA_OPTIONS } from "../TravelSearch/constants";
import ClassOption from "../../modules/TravelFlightForm/components/ClassOption";
import TotalPeople from "../../modules/TravelFlightForm/components/TotalPeople";
import SearchDestination from "../../modules/TravelFlightForm/components/SelectDestination";
import { useLocation, useNavigate } from "react-router-dom";
import { COMMERCE_TRAVEL, FLIGHT_SPECIFIC } from "../../App";

const FlightSpecific = () => {
  const [date, setDate] = React.useState<Date | undefined>();
  const [returnDate, setReturnDate] = React.useState<Date | undefined>();
  const [openSheet, setOpenSheet] = React.useState<boolean>(false);
  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const [isArrival, setIsArrival] = React.useState<boolean>(false);
  const [keywordDeparture, setKeywordDeparture] = React.useState<string>("");
  const [keywordArrival, setKeywordArrival] = React.useState<string>("");
  const [isRoundTrip, setIsRoundTrip] = React.useState<boolean>(false);
  const [openAmountModal, setOpenAmountModal] = React.useState<boolean>(false);
  const [openClassModal, setOpenClassModal] = React.useState<boolean>(false);
  const [selectedClass, setSelectedClass] = React.useState<string>("");
  const [counts, setCounts] = React.useState<{
    adults: number;
    children: number;
    babies: number;
  }>({
    adults: 0,
    children: 0,
    babies: 0,
  });
  const [totalPeople, setTotalPeople] = React.useState<number | undefined>(
    undefined
  );
  const [visibleDepartureCalendarModal, setVisibleDepartureCalendarModal] =
    React.useState<boolean>(false);
  const [visibleReturnCalendarModal, setVisibleReturnCalendarModal] =
    React.useState<boolean>(false);

  const [optionsData, setOptionsData] = React.useState<
    AutoCompleteDropdownOptionProps[]
  >([]);

  const navigate = useNavigate();
  const location = useLocation();
  const isFlightSearchSpecific = location.pathname?.includes(FLIGHT_SPECIFIC);

  const isLoading =
    isTyping &&
    (isArrival ? keywordArrival?.length : keywordDeparture?.length) > 0;

  const handleSelect = (data: AutoCompleteDropdownOptionProps) => {
    setIsTyping(false);
    if (isArrival) {
      setKeywordArrival(data?.title);
    } else {
      setKeywordDeparture(data?.title);
    }
  };

  const handleChangeKeyword = (value: string) => {
    const filteredData = DUMMY_DATA_OPTIONS.filter((data) =>
      String(data?.title)?.toLowerCase().includes(value.toLowerCase())
    );
    setOptionsData(filteredData);
    if (isArrival) {
      setKeywordArrival(value);
    } else {
      setKeywordDeparture(value);
    }
  };

  const handleOpenDepartureCalendarModal = () => {
    setVisibleDepartureCalendarModal(true);
  };

  const handleOpenReturnCalendarModal = () => {
    setVisibleReturnCalendarModal(true);
  };

  const handleSaveDepartureDate = () => {
    setDate(date);
    setVisibleDepartureCalendarModal(false);
  };

  const handleSaveReturnDate = () => {
    setReturnDate(returnDate);
    setVisibleReturnCalendarModal(false);
  };

  const handleOpenSearchModal = (isArrival: boolean) => {
    setIsArrival(isArrival);
    setOpenSheet(true);
  };

  const handleClose = () => {
    setOpenSheet(false);
  };

  const handleCloseAmount = () => {
    setOpenAmountModal(false);
  };

  const handleCloseClass = () => {
    setOpenClassModal(false);
  };

  const toggleRoundTrip = () => {
    setIsRoundTrip(!isRoundTrip);
    if (isRoundTrip) {
      setReturnDate(undefined);
    }
  };

  const handleSelectClass = (classType: string) => {
    setSelectedClass(classType);
  };

  const handleCountChange = (
    type: "adults" | "children" | "babies",
    operation: "increment" | "decrement"
  ) => {
    setCounts((prev) => {
      const currentCount = prev[type];
      if (operation === "increment") {
        return { ...prev, [type]: currentCount + 1 };
      }
      if (currentCount > 0) {
        return { ...prev, [type]: currentCount - 1 };
      }
      return prev;
    });
  };

  const handleCalculateAmountPeople = () => {
    const calculatePeople = counts.adults + counts.children + counts.babies;
    setTotalPeople(calculatePeople);
    setOpenAmountModal(false);
  };

  const handleSearchTravel = (city = keywordArrival, cityId = "") => {
    navigate({
      pathname: `${COMMERCE_TRAVEL}/explore`,
      search: `?city=${city}&cityId=${cityId}`,
    });
  };
  const handleClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const city = target.dataset.city as string;
    const cityid = target.dataset.cityid as string;

    handleSearchTravel(city, cityid);
  };

  const ContainerWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    if (isFlightSearchSpecific) {
      return (
        <>
          <Navbar className="px-4" />
          <div className="bg-inactiveGrey h-screen overflow-hidden relative">
            <div
              className="bg-no-repeat bg-contain"
              style={{
                backgroundImage: `url(${bgFlight})`,
              }}
            >
              <div className="flex flex-col pt-16 pb-4 px-4">
                <span className="text-white text-xl font-bold">
                  Cari Tiket Pesawat
                </span>
                <span className="text-white text-xs">
                  Cari penerbangan paling cocok untukmu di sini
                </span>
              </div>

              <div
                className="py-4"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(239, 241, 244, 0.00) 30%, #EFF1F4 30%)",
                }}
              >
                <div className="px-4">
                  <div className="bg-white rounded-2xl z-10 p-4">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="overflow-hidden relative">
          <div>
            <div className="py-4">
              <div className="px-4">
                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <ContainerWrapper>
        <TravelFlightForm
          date={date}
          selectedClass={selectedClass}
          returnDate={returnDate}
          isRoundTrip={isRoundTrip}
          keywordDeparture={keywordDeparture}
          keywordArrival={keywordArrival}
          totalPeople={totalPeople}
          openDepartureModal={() => handleOpenSearchModal(false)}
          openArrivalModal={() => handleOpenSearchModal(true)}
          openClassModal={() => setOpenClassModal(true)}
          openAmountModal={() => setOpenAmountModal(true)}
          showDepartureCalendar={handleOpenDepartureCalendarModal}
          showReturnCalendar={handleOpenReturnCalendarModal}
          toggleRoundTrip={toggleRoundTrip}
          handleSearchTravel={handleClick}
          buttonLabel={isFlightSearchSpecific ? "Cari" : "Simpan"}
        />
      </ContainerWrapper>
      {/* Pilih Kelas*/}
      <BottomSheet open={openClassModal} onClose={handleCloseClass}>
        <ClassOption
          selectedClass={selectedClass}
          handleCloseClass={handleCloseClass}
          handleSelectClass={handleSelectClass}
        />
      </BottomSheet>

      {/* Jumlah Orang */}
      <BottomSheet open={openAmountModal} onClose={handleCloseAmount}>
        <TotalPeople
          counts={counts}
          handleCalculateAmountPeople={handleCalculateAmountPeople}
          handleCountChange={handleCountChange}
        />
      </BottomSheet>

      {/* Pilih Destinasi */}
      <BottomSheet onClose={handleClose} open={openSheet}>
        <SearchDestination
          isArrival={isArrival}
          keyword={isArrival ? keywordArrival : keywordDeparture}
          optionsData={optionsData}
          isLoading={isLoading}
          handleChangeKeyword={handleChangeKeyword}
          setIsTyping={setIsTyping}
          handleSelect={handleSelect}
        />
      </BottomSheet>
      <CalendarModal
        open={visibleDepartureCalendarModal}
        onClose={() => setVisibleDepartureCalendarModal(false)}
        setDate={setDate}
        handleSaveDate={handleSaveDepartureDate}
        date={date}
      />
      <CalendarModal
        open={visibleReturnCalendarModal}
        onClose={() => setVisibleReturnCalendarModal(false)}
        handleSaveDate={handleSaveReturnDate}
        setDate={setReturnDate}
        date={returnDate}
      />
    </>
  );
};

export default FlightSpecific;
