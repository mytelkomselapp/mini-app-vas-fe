import * as React from "react";
import { useFetchFreemiumUserPackage } from "../network";
import { FlightFreemiumUserPackageData } from "../network/types/response-props";

export type PackageType = "quota" | "unlimited";
export type BuyPackageType = "forbidden" | "allowed";

interface Props {
  data?: FlightFreemiumUserPackageData;
  buyPackageStatus: BuyPackageType;
  isLoading: boolean;
}

const useUserPackageStatus = (enabled?: boolean): Props => {
  const {
    data: dataRaw,
    isFetching,
    isLoading: loadingFreemiumUserPackage,
  } = useFetchFreemiumUserPackage(enabled);

  const dataPackage = dataRaw?.data?.data;

  const userStatus = React.useMemo(() => {
    return {
      hasActivePackage: dataPackage?.status === "active",
      packageType: dataPackage?.package_type,
      remainingQuota: dataPackage?.quota ?? 0,
    };
  }, [dataPackage]);

  const buyPackageStatus = React.useMemo((): BuyPackageType => {
    const { hasActivePackage, packageType, remainingQuota } = userStatus;

    /* Check Unlimited Package */
    if (hasActivePackage && packageType === "unlimited") return "forbidden";
    /* Check Package By Quota */
    if (hasActivePackage && remainingQuota > 0) return "forbidden";

    return "allowed";
  }, [userStatus]);

  return {
    buyPackageStatus,
    isLoading: isFetching || loadingFreemiumUserPackage,
    data: dataPackage,
  };
};

export default useUserPackageStatus;
