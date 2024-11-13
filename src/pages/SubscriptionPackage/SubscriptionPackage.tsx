import * as React from "react";
import LoveIcon from "../../assets/ico_love_gradient.svg";
import PlaneIcon from "../../assets/ico_plane_gradient.svg";
import Navbar, { NavColor } from "../../components/Navbar";
import FlightPackageList from "../../modules/FlightPackageList";
import { useFetchFreemiumPackage } from "../../network";
import IconNotification from "../../assets/ico-notification.svg";
import Show from "../../components/Show";
import useUserPackageStatus from "../../hooks/useUserPackageStatus";
import Illustration from "../../assets/bg/bg-package.png";
import { FlightFreemiumPackageData } from "../../network/types/response-props";
import { screenView } from "../../network/analytics/tracker";
import { handleNavigate } from "../../lib/utils";
import LoadingScreen from "../../components/LoadingScreen";

const SubscriptionPackage = () => {
  const { data: dataPackageRaw, isFetching: fetchingFreemiumPackage } =
    useFetchFreemiumPackage();

  const { isLoading: loadingUserPackage } = useUserPackageStatus();

  const dataPackage = dataPackageRaw?.data?.data?.packages ?? [];

  const isLoading = fetchingFreemiumPackage || loadingUserPackage;

  const handleClick = (data: FlightFreemiumPackageData) => {
    return handleNavigate("/pages/PackageDetail/index", ``, {
      flightDetail: data,
    });
  };

  React.useEffect(() => {
    screenView("Flight Tracking Package", window.location.pathname);
  }, []);

  return (
    <React.Fragment>
      <Show
        when={!isLoading}
        fallbackComponent={
          <LoadingScreen text="Loading..." customClassName="mx-[20px]" />
        }
      >
        <div
          className="h-[190px] bg-no-repeat bg-bannerImage"
          style={{ backgroundImage: `url(${Illustration})` }}
        >
          <Navbar title="" className="my-0 p-4" color={NavColor?.Light} />
        </div>
        <div className="bg-[#F6F3F3] h-full overflow-y-auto">
          <div className="py-6 mx-6 mb-[27px]">
            <span className="font-batikSans font-bold text-[24px]">
              Paket Ikuti Penerbangan
            </span>

            <div className="flex gap-3 items-center mt-4">
              <img className="w-[24px] h-[24px]" src={LoveIcon} />
              <span className="font-sans text-xs">
                Lacak penerbangan dengan mudah
              </span>
            </div>
            <div className="flex gap-3 items-center mt-[18px]">
              <img className="w-[24px] h-[24px]" src={PlaneIcon} />
              <span className="font-sans text-xs whitespace-pre leading-5">
                {
                  "Lihat detail pesawat dari bagasi, check in gate\ndan status penerbangan"
                }
              </span>
            </div>
            <div className="flex gap-3 items-center mt-[18px]">
              <img className="w-[24px] h-[24px]" src={IconNotification} />
              <span className="font-sans text-xs whitespace-pre leading-5">
                {"Dapatkan notifikasi informasi penerbangan"}
              </span>
            </div>
            <FlightPackageList
              data={dataPackage}
              isLoading={isLoading}
              onClick={handleClick}
            />
          </div>
        </div>
      </Show>
    </React.Fragment>
  );
};

export default SubscriptionPackage;
