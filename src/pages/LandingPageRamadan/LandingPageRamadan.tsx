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
import PrayerCard from "./components/PrayerCard";

const LandingPageRamadan = () => {
  const [scrollElement, setScrollElement] = React.useState<string>("");

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

  return (
    <React.Fragment>
      <View
        style={{ backgroundImage: `url(${bgLanding})` }}
        className="bg-cover bg-no-repeat bg-center"
      >
        <View className="p-4">
          <PrayerCard />
          <View className="mt-[120px]">
            <h2 className="font-semibold text-2xl text-white">{title}</h2>
            <h6 className="text-xs mt-2 text-white">{subtitle}</h6>
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

export default LandingPageRamadan;
