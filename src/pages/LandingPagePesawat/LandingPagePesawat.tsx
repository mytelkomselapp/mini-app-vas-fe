import * as React from "react";
import FlightLandingCardMenu from "../../modules/FlightLandingCardMenu";
// import "../../App.css";
import FlightForm from "../../modules/FlightForm";
import Navbar, { NavColor } from "../../components/Navbar";
import {
  useFetchCMSLandingPage,
  useFetchFlightTrack,
  usePostClaimFreeTicket,
} from "../../network";
import { screenView } from "../../network/analytics/tracker";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import FlightFollowing from "../../modules/FlightFollowing";
import FlightFollowingAll from "../../modules/FlightFollowingAll";
import SearchIcon from "../../assets/ico_search.svg";
import useUserPackageStatus from "../../hooks/useUserPackageStatus";
import bgLanding from "../../assets/bg/bg-airplane-hq.jpg";
import { View } from "@tarojs/components";
import CarouselTaro from "../../components/ui/carouselTaro";

const LandingPagePesawat = () => {
  // let { type } = useParams();
  const { mutateAsync: claimFreeTicket, isSuccess } = usePostClaimFreeTicket();
  console.log({ claimFreeTicket });
  const { data: dataRaw, isFetching: fetchingCMSLandingPage } =
    useFetchCMSLandingPage();
  const { data: dataRawTrackFlights, isLoading } = useFetchFlightTrack();
  const { buyPackageStatus: viewPageAction, data } =
    useUserPackageStatus(isSuccess);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const dataFlight = dataRaw?.data?.data;
  const title = dataFlight?.title;
  const subtitle = dataFlight?.subtitle;
  const dataTrackFlights =
    dataRawTrackFlights?.data?.data?.tracked_flights || [];
  const badgeCount = dataTrackFlights?.length;
  const nearestFlight = dataTrackFlights.sort(
    (a, b) =>
      (a?.flight?.departure_time as any) - (b?.flight?.departure_time as any)
  );
  const nearestThreeFlight = nearestFlight?.slice(0, 3);
  const countItem = [...Array(count + 1)?.keys()];
  React.useEffect(() => {
    screenView(); //fire screen view tracker
    claimFreeTicket();
  }, []);

  // React.useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   setCount(api.scrollSnapList().length);
  //   setCurrent(api.selectedScrollSnap() + 1);

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap() + 1);
  //   });
  //   claimFreeTicket();
  // }, [api]);

  return (
    <React.Fragment>
      <div
        style={{ backgroundImage: `url(${bgLanding})` }}
        className="bg-cover bg-no-repeat bg-center"
      >
        <div className="p-4">
          <Navbar badgeCount={badgeCount} color={NavColor.Light} />
          <div className="mt-[120px]">
            <h2 className="font-semibold text-2xl text-white">{title}</h2>
            <h6 className="text-xs mt-2 text-white">{subtitle}</h6>
          </div>
          {/* <CarouselTaro autoplay={false} circular={true}>
          <View className="w-full flex overflow-auto">
                <CarouselItem>
                  <FlightForm
                    data={dataFlight}
                    viewPageAction={viewPageAction}
                    remainingQuota={data?.quota}
                    packageType={data?.package_type}
                    userType={data?.new_user}
                  />
                </CarouselItem>
                {nearestThreeFlight?.map((val, i) => {
                  return (
                    <CarouselItem key={i}>
                      <FlightFollowing
                        data={val}
                        viewPageAction={viewPageAction}
                      />
                    </CarouselItem>
                  );
                })}
                {nearestFlight?.length > 0 && (
                  <CarouselItem>
                    <FlightFollowingAll data={nearestFlight} />
                  </CarouselItem>
                )}
              </View>
                  {nearestThreeFlight?.map((val, i) => {
                  return (
                    <CarouselItem key={i}>
                      <FlightFollowing
                        data={val}
                        viewPageAction={viewPageAction}
                      />
                    </CarouselItem>
                  );
                })}
          </CarouselTaro> */}
          {/* <FlightForm
            data={dataFlight}
            viewPageAction={viewPageAction}
            remainingQuota={data?.quota}
            packageType={data?.package_type}
            userType={data?.new_user}
          /> */}
          <View
            className="w-screen overflow-x-auto overflow-y-hidden mb-4 flex items-end"
            style={{ display: "-webkit-inline-box" }}
          >
            <FlightForm
              className="w-[300px] h-[308px] mt-4"
              data={dataFlight}
              viewPageAction={viewPageAction}
              remainingQuota={data?.quota}
              packageType={data?.package_type}
              userType={data?.new_user}
            />

            {!isLoading && (
              // <CarouselTaro autoplay={false} circular={true}>
              <>
                {nearestThreeFlight?.map((val, i) => {
                  return (
                    <FlightFollowing
                      data={val}
                      classNameProps="!mx-4 w-[300px] h-[308px]"
                      viewPageAction={viewPageAction}
                    />
                  );
                })}
                {nearestFlight?.length > 0 && (
                  // <CarouselItem>
                  <FlightFollowingAll
                    data={nearestFlight}
                    classNameProps="!mr-9 w-[300px] !h-[306px]"
                  />
                  // </CarouselItem>
                )}
                {/* </View> */}
                <div className="flex justify-center mt-2 mb-4 items-center gap-1">
                  {countItem?.map((_, i) => {
                    if (i > 1) {
                      return (
                        <div
                          key={i}
                          className={`w-[6px] h-[6px] rounded-xl ${
                            current === i ? "bg-white" : "bg-[#FFFFFF59]"
                          }`}
                        />
                      );
                    } else {
                      if (i == 1 && countItem?.length - 1 > 1)
                        return (
                          <div
                            key={i}
                            className={
                              current > 1 ? "opacity-[0.4]" : "opacity-1"
                            }
                          >
                            <img src={SearchIcon} />
                          </div>
                        );
                    }
                  })}
                </div>
              </>
              // </CarouselTaro>
            )}
          </View>
        </div>
      </div>
      <FlightLandingCardMenu
        isLoading={fetchingCMSLandingPage}
        data={dataFlight}
      />
    </React.Fragment>
  );
};

export default LandingPagePesawat;
