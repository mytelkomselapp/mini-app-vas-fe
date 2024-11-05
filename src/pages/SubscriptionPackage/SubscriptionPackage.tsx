import * as React from "react";
import LoveIcon from "../../assets/ico_love_gradient.svg";
import PlaneIcon from "../../assets/ico_plane_gradient.svg";
import Navbar, { NavColor } from "../../components/Navbar";
import FlightPackageList from "../../modules/FlightPackageList";
import { useFetchFreemiumPackage } from "../../network";
import IconNotification from "../../assets/ico-notification.svg";
import Show from "../../components/Show";
import Skeleton from "react-loading-skeleton";
import useUserPackageStatus from "../../hooks/useUserPackageStatus";
import Illustration from "../../assets/bg/bg-package.png";
import { FlightFreemiumPackageData } from "../../network/types/response-props";
import { useNavigate } from "react-router-dom";
import { screenView } from "../../network/analytics/tracker";

const SubscriptionPackage = () => {
  const navigate = useNavigate();
  const { data: dataPackageRaw, isFetching: fetchingFreemiumPackage } =
    useFetchFreemiumPackage();

  const { buyPackageStatus, isLoading: loadingUserPackage } =
    useUserPackageStatus();

  const dataPackage = dataPackageRaw?.data?.data?.packages ?? [];

  const isLoading = fetchingFreemiumPackage || loadingUserPackage;

  const handleClick = (data: FlightFreemiumPackageData) => {
    return navigate("/flight/package-info", {
      state: {
        data,
      },
    });
  };

  // const handleGoBack = () => {
  //   navigate(-1);
  // };

  /* TODO: Prevents users who already have a package from accessing the package details page */
  React.useEffect(() => {
    if (buyPackageStatus === "forbidden") {
      // TODO: diaktifkan jika sudah selesai development, karena defaultnya sekarang sudah punya package
      // return handleGoBack();
    }
  }, [buyPackageStatus]);

  React.useEffect(() => {
    screenView("Flight Tracking Package", window.location.pathname);
  }, []);

  return (
    <div className="bg-[#F6F3F3] h-full overflow-y-auto">
      <Show
        when={!isLoading}
        fallbackComponent={
          <Skeleton height={190} width={"100%"} enableAnimation />
        }
      >
        <div
          className="h-[190px] bg-no-repeat bg-bannerImage"
          style={{ backgroundImage: `url(${Illustration})` }}
        >
          <Navbar title="" className="my-0 p-4" color={NavColor?.Light} />
        </div>
      </Show>
      <div className="py-6 mx-6 mb-[27px]">
        <Show
          when={!isLoading}
          fallbackComponent={
            <React.Fragment>
              <Skeleton
                width={200}
                height={24}
                enableAnimation
                borderRadius={8}
              />
              {Array(3)
                .fill(null)
                ?.map((_, idx) => (
                  <div key={idx} className="flex gap-3 items-center mt-4">
                    <Skeleton
                      width={280}
                      height={32}
                      enableAnimation
                      borderRadius={8}
                    />
                  </div>
                ))}
            </React.Fragment>
          }
        >
          <span className="font-batikSans font-bold text-2xl">
            Paket Ikuti Penerbangan
          </span>

          <div className="flex gap-3 items-center mt-4">
            <img src={LoveIcon} />
            <span className="font-sans text-xs">
              Lacak penerbangan dengan mudah
            </span>
          </div>
          <div className="flex gap-3 items-center mt-[18px]">
            <img src={PlaneIcon} />
            <span className="font-sans text-xs whitespace-pre leading-5">
              {
                "Lihat detail pesawat dari bagasi, check in gate\ndan status penerbangan"
              }
            </span>
          </div>
          <div className="flex gap-3 items-center mt-[18px]">
            <img src={IconNotification} />
            <span className="font-sans text-xs whitespace-pre leading-5">
              {"Dapatkan notifikasi informasi penerbangan"}
            </span>
          </div>
        </Show>
        <FlightPackageList
          data={dataPackage}
          isLoading={isLoading}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SubscriptionPackage;
