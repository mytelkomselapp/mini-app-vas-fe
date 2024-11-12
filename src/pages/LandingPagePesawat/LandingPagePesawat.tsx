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
import { ScrollView, View } from "@tarojs/components";
import useUserPackageStatus from "../../hooks/useUserPackageStatus";

const LandingPagePesawat = () => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const [scrollElement, setScrollElement] = React.useState<string>("");

  const { mutateAsync: claimFreeTicket, isSuccess } = usePostClaimFreeTicket();
  const { data: dataRaw, isFetching: fetchingCMSLandingPage } =
    useFetchCMSLandingPage();
  const { data: dataRawTrackFlights, isLoading } = useFetchFlightTrack();
  const { buyPackageStatus: viewPageAction, data } =
    useUserPackageStatus(isSuccess);

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
  const handleScroll = (e, forceValue) => {
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

  // React.useEffect(() => {
  //   if (dataTrackFlights) {
  //     handleScroll(null, 300);
  //   }
  // }, [dataTrackFlights]);

  React.useEffect(() => {
    setTimeout(() => {
      setScrollElement("test-scroll");
    }, 5000);
  }, []);

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
          >
            <View
              ref={wrapperRef}
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
                />
              </View>

              {!isLoading &&
                nearestThreeFlight?.map((flight, index) => (
                  <View
                    id="test-scroll"
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
            {sliderItems.map((_, i) => (
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
    </React.Fragment>
  );
};

export default LandingPagePesawat;
