import * as React from "react";
import FlightLandingCardMenu from "../../modules/FlightLandingCardMenu";
import FlightForm from "../../modules/FlightForm";
import Navbar, { NavColor } from "../../components/Navbar";
import {
  useFetchCMSLandingPage,
  useFetchFlightTrack,
  usePostClaimFreeTicket,
} from "../../network";
import { screenView } from "../../network/analytics/tracker";
import FlightFollowing from "../../modules/FlightFollowing";
import FlightFollowingAll from "../../modules/FlightFollowingAll";
import bgLanding from "../../assets/bg/bg-airplane-hq.jpg";
import { BaseEventOrig, ScrollView, View } from "@tarojs/components";
import useUserPackageStatus from "../../hooks/useUserPackageStatus";
import FlightSearch from "../../modules/FlightSearch";
import useToggle from "../../hooks/useToggle";
import {
  DestinationOriginProps,
  useDestination,
  useOrigin,
} from "../../store/flight";

type ActiveSearchInput = "kota-asal" | "kota-tujuan" | string;

const LandingPagePesawat = () => {
  const [scrollElement, setScrollElement] = React.useState<string>("");

  const origin = useOrigin((state) => state.origin);
  const destination = useDestination((state) => state.destination);

  const setOrigin = useOrigin((state) => state.setOrigin);
  const setDestination = useDestination((state) => state.setDestination);

  const [activeSearchInput, setActiveSearchInput] =
    React.useState<ActiveSearchInput>("");

  const { mutateAsync: claimFreeTicket, isSuccess } = usePostClaimFreeTicket();
  const { data: dataRaw, isFetching: fetchingCMSLandingPage } =
    useFetchCMSLandingPage();
  const {
    data: dataRawTrackFlights,
    isLoading,
    isFetched,
  } = useFetchFlightTrack();
  const { buyPackageStatus: viewPageAction, data } =
    useUserPackageStatus(isSuccess);

  const {
    active: visibleFlightSearchModal,
    toggleActive: toggleVisibleFlightSearchModal,
  } = useToggle();

  const [currentSlide, setCurrentSlide] = React.useState(0);

  const dataFlight = dataRaw?.data?.data;
  const title = dataFlight?.title;
  const subtitle = dataFlight?.subtitle;
  const dataTrackFlights =
    dataRawTrackFlights?.data?.data?.tracked_flights || [];
  const nearestFlight = dataTrackFlights.sort(
    (a, b) =>
      new Date(a?.flight?.departure_time) - new Date(b?.flight?.departure_time)
  );
  const nearestThreeFlight = nearestFlight?.slice(0, 3);
  const sliderItems = [...Array(nearestThreeFlight.length + 2).keys()];
  const handleScroll = (
    e: BaseEventOrig<{ scrollLeft: number }>,
    forceValue?: number
  ) => {
    const scrollLeft = forceValue || e.detail.scrollLeft;
    const slideWidth = 300; // Adjust based on your slide width
    const newSlide = Math.round(scrollLeft / slideWidth);
    if (newSlide <= sliderItems?.length - 1) {
      setCurrentSlide(newSlide);
    }
  };

  React.useEffect(() => {
    screenView(); // Track page view
    claimFreeTicket();
  }, []);

  React.useEffect(() => {
    if (isFetched && dataTrackFlights?.length) {
      setCurrentSlide(1);
      setScrollElement("scroll-to-0");
    }
  }, [isFetched, dataTrackFlights]);

  const handleSelectData = (
    value: DestinationOriginProps,
    name: ActiveSearchInput
  ) => {
    if (name === "kota-asal") return setOrigin(value);
    if (name === "kota-tujuan") return setDestination(value);
  };

  const handleOpenSearchFlight = (name: string) => {
    toggleVisibleFlightSearchModal();
    setActiveSearchInput(name as ActiveSearchInput);
  };

  return (
    <React.Fragment>
      <View
        style={{ backgroundImage: `url(${bgLanding})` }}
        className="bg-cover bg-no-repeat bg-center"
      >
        <View className="p-4">
          <Navbar badgeCount={dataTrackFlights.length} color={NavColor.Light} />
          <View className="mt-[120px]">
            <h2 className="font-semibold text-2xl text-white">{title}</h2>
            <h6 className="text-xs mt-2 text-white">{subtitle}</h6>
          </View>

          <ScrollView
            fastDeceleration
            enhanced
            className="w-[90vw] h-auto flex"
            scrollX
            scrollAnimationDuration="0"
            scrollWithAnimation={false}
            scrollIntoView={scrollElement}
            onScroll={handleScroll}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",

                marginBottom: "32px",
              }}
            >
              <View className="w-[300px] h-[390px] mr-4 mt-1 flex-grow">
                <FlightForm
                  data={dataFlight}
                  viewPageAction={viewPageAction}
                  remainingQuota={data?.quota}
                  packageType={data?.package_type}
                  userType={data?.new_user}
                  onOpenSearchFlight={handleOpenSearchFlight}
                />
              </View>

              {!isLoading &&
                nearestThreeFlight?.map((flight, index) => (
                  <View
                    id={`scroll-to-${index}`}
                    key={index}
                    className="w-[300px] h-[auto] mx-2" // Set a fixed height for consistency
                    style={{
                      // height: "390px", // Ensure all cards have the same height
                      alignItems: "center",
                    }}
                  >
                    <FlightFollowing
                      data={flight}
                      viewPageAction={viewPageAction}
                      classNameProps="w-[308px] h-[390px]"
                    />
                  </View>
                ))}

              {!isLoading && nearestFlight?.length > 0 && (
                <View
                  className="w-[300px] h-[390px] ml-2 " // Set a fixed height for consistency
                  style={{
                    height: "390px", // Ensure all cards have the same height
                  }}
                >
                  <FlightFollowingAll
                    data={nearestFlight}
                    classNameProps="w-[308px]"
                  />
                </View>
              )}
            </View>
          </ScrollView>

          {/* Dot Indicator */}
          <View className="flex justify-center mt-2 mb-4 items-center gap-1">
            {nearestThreeFlight?.length &&
              sliderItems?.map((_, i) => (
                <View
                  key={i}
                  className={`w-[6px] h-[6px] rounded-full ${
                    currentSlide === i ? "bg-white" : "bg-[#FFFFFF59]"
                  }`}
                />
              ))}
          </View>
        </View>
      </View>
      <FlightLandingCardMenu
        isLoading={fetchingCMSLandingPage}
        data={dataFlight}
      />

      <FlightSearch
        open={visibleFlightSearchModal}
        onClose={toggleVisibleFlightSearchModal}
        onSelect={handleSelectData}
        name={activeSearchInput}
        dataPopularCities={dataFlight?.popularCitiesSection ?? []}
      />
    </React.Fragment>
  );
};

export default LandingPagePesawat;
