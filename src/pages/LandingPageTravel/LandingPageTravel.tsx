import bgLanding from "../../assets/bg/bg-travel-landing.png";
import * as React from "react";
import "../../App.css";
import InputComponent from "../../modules/FlightSearch/components/InputComponent";
import { useNavigate } from "react-router-dom";
import { COMMERCE_TRAVEL } from "../index/index";
import FlightLandingMenu from "../../modules/FlightLandingCardMenu/components/FlightLandingMenu";
import { buttonClick } from "../../network/analytics/tracker";
import { useFetchCMSLandingPage } from "../../network";
import ArrowRight from "../../assets/chevron-right.svg";
import IconTrx from "../../assets/ico_transaction_red.svg";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import AllMenu from "./components/AllMenu";
import FlightActivityCard from "../../modules/FlightActivityCard";

const title = "Mau pergi ke mana?";
const placeholder = "Cari destinasi perjalananmu";
const allMenu = {
  iconUrl: "./apps-mics.svg",
  targetUrl: "all-menu",
  title: "Lihat Semua",
};
const LandingPageTravel = () => {
  const navigate = useNavigate();
  const [api, setApi] = React.useState<CarouselApi>();
  const [open, setOpen] = React.useState(false);
  const { data: dataRaw, isFetching: fetchingCMSLandingPage } =
    useFetchCMSLandingPage();

  const dataFlight = dataRaw?.data?.data;
  const dataFlightAppSection = dataFlight?.appsSection ?? [];
  const popularCities = dataFlight?.popularCitiesSection ?? [];

  const isActivityAvailable = false;

  React.useEffect(() => {
    if (!api) {
      return;
    }
  });
  const handleNavigateSearch = () => {
    navigate(`${COMMERCE_TRAVEL}/search`);
  };
  const handleNavigateActivity = () => {
    navigate(`${COMMERCE_TRAVEL}/my-activity`);
  };
  const handleMenuClick = (targetUrl: string, title: string) => {
    buttonClick(title, `Navigate to ${title}`, "", window.location.pathname);
    if (targetUrl === "all-menu") return setOpen(true);
    if (title === "My Ticket") return navigate("/flight/ticket-list");

    if (targetUrl) {
      return window.open(targetUrl, "_blank");
    }

    return;
  };
  const renderRecentActivity = () => {
    if (isActivityAvailable) {
      return (
        <div className="bg-white w-full rounded-t-2xl py-6 px-[16px] mt-5">
          <img src={FlightActivityCard} />
        </div>
      );
    }
  };
  return (
    <div className="bg-inactiveGrey h-screen">
      <div
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), linear-gradient(180deg, rgba(65, 0, 0, 0.00) -5%, rgba(67, 1, 1, 0.80) 84.44%), url(${bgLanding}) `,
        }}
        className="bg-cover bg-no-repeat bg-center"
      >
        <div
          className="py-4"
          style={{
            background:
              "linear-gradient(180deg, rgba(239, 241, 244, 0.00) 25%, #EFF1F4 93.93%)",
          }}
        >
          <div>
            <div className="flex justify-center mt-[10px]">
              <h2 className="font-semibold text-xl text-white mb-2">{title}</h2>
            </div>
            <div className="w-full px-4" onClick={handleNavigateSearch}>
              <InputComponent
                isLoading={false}
                isShowClearButton={false}
                value={""}
                placeholder={placeholder}
                className="justify-normal cursor-pointer"
                classNameInput="text-[14px] font-normal placeholder-grey placeholder-opacity-100 caret-transparent"
              />
            </div>
            {renderRecentActivity()}
            <div className={isActivityAvailable ? "bg-inactiveGrey pt-2" : ""}>
              <div className="px-4">
                <div className="bg-white rounded-2xl mt-5">
                  <div className="grid grid-cols-4 p-4 justify-around gap-3">
                    <FlightLandingMenu
                      data={[...dataFlightAppSection, allMenu]}
                      isLoading={fetchingCMSLandingPage}
                      onClick={handleMenuClick}
                      classNameText="mt-2 w-[58px] text-center text-[10px]"
                    />
                  </div>
                  <div className="h-[1px] w-full bg-dividerGrey opacity-[0.7]" />
                  <div className="p-4 flex" onClick={handleNavigateActivity}>
                    <IconTrx className="mr-2" />
                    <span className="text-sm">Transaksi dan Aktifitas</span>
                    <ArrowRight className="ml-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 pt-0 pr-0 bg-inactiveGrey">
        <span className="font-semibold text-primaryBlack font-sans">
          Destinasi Populer
        </span>
        <br />
        <span className="text-xs text-primaryBlack font-sans">
          {"Inspirasi destinasi perjalananmu berikutnya."}
        </span>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {popularCities?.map((val, i) => {
              return (
                <CarouselItem
                  key={i}
                  className={`mt-[12px] ${
                    i === popularCities?.length - 1
                      ? "flex-[0_0_90%]"
                      : "flex-[0_0_300px]"
                  }`}
                  onClick={() =>
                    navigate({
                      pathname: `${COMMERCE_TRAVEL}/explore`,
                      search: `?cityId=${val?.id}&city=${val?.cityName}`,
                    })
                  }
                >
                  <div
                    className="rounded-2xl w-[286px] h-[180px] flex-col justify-end p-4 flex text-white"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(65, 0, 0, 0.00) 37%, rgba(67, 1, 1, 0.80) 100%), url(<path-to-image>) lightgray 50% / cover no-repeat",
                    }}
                  >
                    <span className="mb-1 text-xl">{val?.cityName ?? "-"}</span>
                    <span className="text-xs">
                      {val?.cityName ?? "-"}
                      {", Indonesia"}
                    </span>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
      <AllMenu open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default LandingPageTravel;
