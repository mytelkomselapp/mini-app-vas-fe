// import Navbar from "../../components/Navbar";
import FlightPurchasePackage from "../../modules/FlightPurchasePackage";
import React, { useMemo, useState } from "react";
import { FlightFreemiumPackageData } from "../../network/types/response-props";
import FlightPackageDetail from "../../modules/FlightPackageDetail";
import { useFetchWeboptinToken, usePostErrorBuyPackage } from "../../network";
import { useWeboptinTokenData } from "../../store/flight";
import { screenView } from "../../network/analytics/tracker";
import Taro from "@tarojs/taro";
import { getNavigateState, TaroStorage } from "../../lib/utils";
import Toast from "../../components/Toast";

const PackageDetail: React.FC = () => {
  const [toast, setToast] = useState<{ title: string; description: string; status: "success" | "error"; duration: number } | null>(null);

  const showToast = ({
    title,
    description,
    status = "success",
    duration = 3000,
  }: {
    title: string;
    description: string;
    status?: "success" | "error";
    duration?: number;
  }) => {
    setToast({ title, description, status, duration });
    setTimeout(() => setToast(null), duration);
  };

  const currentPath = Taro.getCurrentInstance().router?.path || "";
  const state = useMemo(() => getNavigateState(currentPath), [currentPath]);
  const packageData = state.flightDetail as FlightFreemiumPackageData;

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

      if (fetchData?.data && package_id) {
        const tokenData = fetchData?.data?.data;
        setSid(package_id);
        TaroStorage.setItem("sid", String(package_id))

        if (tokenData?.data?.url) {
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
        showToast({
          title: "Uh oh! Something went wrong",
          description: errorDescription,
          status: "error",
          duration: 3000,
        });

      }
    } catch (error: unknown) {
      const errorDescription = await PostLogErrorBuyPackage(error);
      showToast({
        title: "Gagal Membeli Paket",
        description: errorDescription,
        status: "error",
        duration: 3000,
      });
    }
  };

  React.useEffect(() => {
    screenView("Flight Tracking Package Detail", window.location.pathname);
  }, []);

  return (
    <>
      <div className="flex flex-col pt-2 bg-[#EFF1F4] min-h-screen overflow-hidden no-scrollbar">
        {/* <div className="px-4">
          <Navbar title="Detail Paket" />
        </div> */}
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
        <div>
          {toast && (
            <Toast
              title={toast.title}
              description={toast.description}
              status={toast.status}
              onClose={() => setToast(null)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PackageDetail;
