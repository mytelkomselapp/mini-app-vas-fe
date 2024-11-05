// Import necessary components
import { COMMERCE_TRAVEL } from "../..//../App";
import ArrowRightWhite from "../..//../assets/arrow-right-white.svg";
import bgLanding from "../..//../assets/bg/bg-travel-landing.png";
import Edit from "../..//../assets/ico-edit-white.svg";
import Info from "../..//../assets/ico-info-white.svg";
import IconCalendar from "../..//../assets/ico_calendar.svg";
import Navbar from "../..//../components/Navbar";
import useToggle from "../..//../hooks/useToggle";
import { CalendarModal } from "../..//../modules/FlightForm";
import InputComponent from "../..//../modules/FlightSearch/components/InputComponent";
import { useTravelExplore } from "../..//../store/flight";
import moment from "moment";
import React, { useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import FlightRecommendation from "./components/FlightRecommendation";
import Flights from "./components/Flights";
import ConfirmationModal from "./components/ConfirmationModal";
import FilterButton from "./components/FilterButton";
import IconFilter from "../..//../assets/ico-filter.svg";
import FlightFilterBottomSheet from "../..//../components/FlightFilterBottomSheet";
import PassengerDetailModal from "../..//../modules/PassengerDetailModal/PassengerDetailModal";
import EditFlightModal from "./components/EditFlightModal";

const ALL = "Semua";
const FLIGHT_TICKET = "Tiket Pesawat";

const ExploreTravel = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const cityId = searchParams.get("cityId") || "";
  const cityName = searchParams.get("city") || "";
  const { category_travel } = useParams<{ category_travel: string }>();
  const {
    active: visibleCalendarModal,
    toggleActive: toggleVisibleCalendarModal,
  } = useToggle();
  const {
    active: visibleConfirmationModal,
    toggleActive: toggleVisibleConfirmationModal,
  } = useToggle();
  const {
    active: visibleEditFlightModal,
    toggleActive: toggleVisibleEditFlightModal,
  } = useToggle();
  const { exploreDate, setExploreDate } = useTravelExplore();
  const [date, setDate] = React.useState<Date | undefined>();
  const [category, setCategory] = React.useState(ALL);

  const {
    active: visibleDrawerFilter,
    toggleActive: toggleVisibleDrawerFilter,
  } = useToggle();

  const {
    active: visiblePassengerDetailModal,
    toggleActive: toggleVisiblePassengerDetailModal,
  } = useToggle();

  useEffect(() => {
    const element = document.getElementById("scroll-price") || {
      scrollLeft: 0,
    };
    if (exploreDate) {
      element.scrollLeft = 55 * 3;
    }
    setCategory(category_travel === "flight" ? FLIGHT_TICKET : ALL);
  }, [exploreDate, category_travel, state]);

  const handleNavigateSearch = () => {
    navigate(`${COMMERCE_TRAVEL}/search`);
  };
  const handleOpenCalendarModal = () => {
    toggleVisibleCalendarModal();
  };

  const handleSaveDate = () => {
    toggleVisibleCalendarModal();
    setExploreDate(String(date));
  };

  const generateDateInterval = () => {
    const today = moment();
    const theDate = moment(exploreDate)?.isValid()
      ? moment(exploreDate)
      : moment();
    const dayAfter = (count: number) => moment(theDate).add(count, "days");
    const dayBefore = (count: number) =>
      moment(exploreDate).subtract(count, "days");
    if (!exploreDate) {
      return [
        today,
        dayAfter(1),
        dayAfter(2),
        dayAfter(3),
        dayAfter(4),
        dayAfter(5),
        dayAfter(6),
      ];
    } else {
      return [
        dayBefore(3),
        dayBefore(2),
        dayBefore(1),
        moment(exploreDate),
        dayAfter(1),
        dayAfter(2),
        dayAfter(3),
      ];
    }
  };

  const renderCategoryContent = () => {
    if (category === ALL) {
      return (
        <div className="p-4 pr-0 bg-white">
          <FlightRecommendation
            onClick={toggleVisibleConfirmationModal}
            onClickAll={() =>
              navigate(`${COMMERCE_TRAVEL}/explore/flight`, { state: "render" })
            }
          />
        </div>
      );
    } else if (category === FLIGHT_TICKET) {
      const handleFilterClick = (value: string) => {
        if (value === "filter") return toggleVisibleDrawerFilter();
      };

      return (
        <div className="p-4 pr-0 bg-inactiveGrey h-full">
          <FilterButton
            data={[
              {
                content: (
                  <div className="flex justify-center items-center gap-x-[4px]">
                    <img src={IconFilter} />
                    Filter
                  </div>
                ),
                isActiveHighlighted: false,
                value: "filter",
              },
              {
                content: "Termurah",
                isActiveHighlighted: true,
                value: "cheapest",
              },
              {
                content: "Tercepat",
                isActiveHighlighted: true,
                value: "fastest",
              },
              {
                content: "Direct",
                isActiveHighlighted: true,
                value: "direct",
              },
            ]}
            onClick={handleFilterClick}
          />
          <Flights onClick={toggleVisibleConfirmationModal} />
        </div>
      );
    }
  };

  const renderBanner = () => {
    if (category_travel === "flight") {
      return (
        <div
          className="p-4 pr-0 pb-8 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), linear-gradient(180deg, rgba(65, 0, 0, 0.00) -5%, rgba(67, 1, 1, 0.80) 84.44%), url(${bgLanding}) `,
          }}
        >
          <div
            className="w-full p-4 bg-[#FFFFFF20] rounded-2xl backdrop-blur-md relative right-[5px] max-w-[97%] mx-auto"
            onClick={toggleVisibleEditFlightModal}
          >
            <div className="flex flex-row items-center gap-1 mb-2">
              <span className="text-white text-sm font-semibold">
                {"Jakarta (CGK)"}
              </span>
              <img src={ArrowRightWhite} />
              <span className="text-white text-sm font-semibold">
                {"Singapura (SIN)"}
              </span>
              <div className="ml-auto">
                <img src={Edit} />
              </div>
            </div>

            <div className="flex flex-row items-center gap-1">
              <span className="text-white text-xs">{"5 Sep"}</span>
              <span className="text-white text-base">{"•"}</span>
              <span className="text-white text-xs">{"1 orang"}</span>
              <span className="text-white text-base">{"•"}</span>
              <span className="text-white text-xs">{"Ekonomi"}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex mt-3 w-auto max-w-[97%]">
            <div
              onClick={() => setCategory(ALL)}
              className={`flex gap-2 px-3 py-2 rounded-full text-white text-[10px] bg-[#FFFFFF20] w-full`}
            >
              <img src={Info} />
              {"Harga pada saat pemesanan dapat berubah."}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="p-4 pr-0 pb-8 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), linear-gradient(180deg, rgba(65, 0, 0, 0.00) -5%, rgba(67, 1, 1, 0.80) 84.44%), url(${bgLanding}) `,
          }}
        >
          <div className="w-full pr-3" onClick={handleNavigateSearch}>
            <InputComponent
              isLoading={false}
              isShowClearButton={false}
              value={cityName}
              className="justify-normal cursor-pointer"
              classNameInput="text-[14px] font-normal placeholder-grey placeholder-opacity-100 caret-transparent"
            />
          </div>

          {/* Title */}
          <h1 className="text-white text-xl mt-4 font-batikSans font-bold">
            Jelajahi {cityName}
          </h1>

          {/* Navigation Tabs */}
          <div className="flex space-x-2 mt-4 overflow-auto text-xs text-nowrap no-scrollbar">
            <button
              onClick={() => setCategory(ALL)}
              className={`px-3 py-2 rounded-full text-white ${category === ALL ? "bg-blueNavy" : "bg-[#FFFFFF20]"}`}
            >
              {ALL}
            </button>
            <button
              onClick={() => setCategory(FLIGHT_TICKET)}
              className={`px-3 py-2 rounded-full text-white  ${category === FLIGHT_TICKET ? "bg-blueNavy" : "bg-[#FFFFFF20]"}`}
            >
              {FLIGHT_TICKET}
            </button>
            {/* <button className="px-3 py-2 rounded-full bg-[#FFFFFF20] text-white">
            Penginapan
          </button>
          <button className="px-3 py-2 rounded-full bg-[#FFFFFF20] text-white !mr-2">
            Atraksi
          </button> */}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <Navbar className="pl-4" />
      <div className="bg-inactiveGrey">
        {renderBanner()}
        <div className="bg-inactiveGrey rounded-t-2xl z-10 top-[-16px] relative h-screen">
          <div className="bg-white rounded-t-2xl flex space-x-2">
            <div
              className="overflow-auto no-scrollbar flex w-auto max-w-[90%] whitespace-nowrap"
              id="scroll-price"
            >
              {generateDateInterval()?.map((val: moment.Moment, i: number) => {
                const dayLabel = val?.format("D MMM YY");
                const isSelected =
                  moment(exploreDate || new Date())?.format("D MMM YY") ===
                  dayLabel;
                return (
                  <div
                    key={i}
                    className={`bg-white rounded-t-2xl p-2 text-center ${isSelected ? "border-b-[1px] border-textError" : ""}`}
                    onClick={() => {
                      setDate(new Date(String(val)));
                      setExploreDate(String(val));
                    }}
                  >
                    <p
                      className={`text-xs ${isSelected ? "text-textError font-semibold" : ""}`}
                    >
                      {dayLabel}
                    </p>
                    <p
                      className={`text-[10px] ${isSelected ? "text-textError" : ""}`}
                    >
                      Dari Rp1.989.000
                    </p>
                  </div>
                );
              })}
            </div>
            <button
              className="!ml-auto px-4 flex items-center justify-center relative top-[-4px]"
              onClick={handleOpenCalendarModal}
            >
              <img src={IconCalendar} />
            </button>
          </div>
          {renderCategoryContent()}
        </div>
        <CalendarModal
          open={visibleCalendarModal}
          onClose={toggleVisibleCalendarModal}
          setDate={setDate}
          date={date || new Date()}
          handleSaveDate={handleSaveDate}
        />
        <ConfirmationModal
          open={visibleConfirmationModal}
          onClose={toggleVisibleConfirmationModal}
          onSubmit={toggleVisiblePassengerDetailModal}
        />
        <FlightFilterBottomSheet
          open={visibleDrawerFilter}
          onClose={toggleVisibleDrawerFilter}
        />
        <PassengerDetailModal
          open={visiblePassengerDetailModal}
          onClose={toggleVisiblePassengerDetailModal}
        />
        <EditFlightModal
          open={visibleEditFlightModal}
          onClose={toggleVisibleEditFlightModal}
        />
      </div>
    </>
  );
};

export default ExploreTravel;
