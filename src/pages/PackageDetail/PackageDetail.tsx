import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import FlightPurchasePackage from "../../modules/FlightPurchasePackage";
import React from "react";
import { FlightFreemiumPackageData } from "../../network/types/response-props";
import FlightPackageDetail from "../../modules/FlightPackageDetail";
import { useFetchWeboptinToken, usePostErrorBuyPackage } from "../../network";
import { useWeboptinTokenData } from "../../store/flight";
import { toast } from "../../components/ui/use-toast";
import { screenView } from "../../network/analytics/tracker";
import Taro from "@tarojs/taro";

interface Package {
  state: {
    data: FlightFreemiumPackageData;
  };
}

const PackageDetail: React.FC = () => {
  const location = useLocation();
  const { state } = location as Package;
  const packageData = state?.data;

  const { setSid } = useWeboptinTokenData();

  const package_id = packageData?.id;

  const { refetch, isFetching } = useFetchWeboptinToken(package_id);
  const { mutateAsync: postErrorBuyPackage } = usePostErrorBuyPackage();

  const PostLogErrorBuyPackage = async (error: any) => {
    const errorData = error?.response?.data || {
      message: "Unknown error",
      code: "Unknown",
      status: "Unknown",
    };

    const errorPayload = {
      error_type: "button buy package",
      error_data: errorData,
    };

    try {
      await postErrorBuyPackage(errorPayload);
    } catch (PostLogErrorBuyPackage) {
      console.error("Failed to log error:", PostLogErrorBuyPackage);
    }

    return errorData.message || "An unexpected error occurred";
  };

  const handleBuyPackage = async () => {
    try {
      const fetchData = await refetch();

      if (fetchData?.data) {
        const tokenData = fetchData?.data?.data;
        setSid(package_id);

        if (tokenData) {
          Taro.navigateTo({
            url:
              "/pages/Webview/index?url=" +
              encodeURIComponent(tokenData?.data?.url),
          });
          //  window.open(tokenData?.data?.url, "_self");
          return;
        }
      } else {
        const errorData = fetchData?.error;
        const errorDescription = await PostLogErrorBuyPackage(errorData);
        toast({
          title: "Uh oh! Something went wrong.",
          description: errorDescription,
          className: "bg-[#fef2f4] text-solidRed",
          duration: 3000,
        });
      }
    } catch (error: unknown) {
      const errorDescription = await PostLogErrorBuyPackage(error);
      toast({
        title: "Gagal Membeli Paket",
        description: errorDescription,
        className: "bg-[#fef2f4] text-solidRed",
        duration: 3000,
      });
    }
  };

  React.useEffect(() => {
    screenView("Flight Tracking Package Detail", window.location.pathname);
  }, []);

  return (
    <>
      <div className="flex flex-col pt-2 bg-[#EFF1F4] h-full">
        <div className="px-4">
          <Navbar title="Detail Paket" />
        </div>
        <div className="flex-grow px-4">
          <FlightPackageDetail data={packageData} />
        </div>
        <div className="mt-auto bg-white px-4 pt-3 py-5">
          <FlightPurchasePackage
            data={packageData}
            onClick={handleBuyPackage}
            disabled={isFetching}
          />
        </div>
      </div>
    </>
  );
};

export default PackageDetail;
