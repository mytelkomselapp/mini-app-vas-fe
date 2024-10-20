//import { useParams } from "react-router-dom";
import Button from "../..//../components/Button";
import Navbar, { NavColor } from "../..//../components/Navbar";
import FlightBoardInfo from "../..//../modules/FlightBoardInfo";
import FlightDetailsCard from "../..//../modules/FlightDetailsCard";
import { ReactComponent as IconTicketUpload } from "../..//../assets/icon-ticket-upload.svg";
import { ReactComponent as ArrowRight } from "../..//../assets/arrow-right.svg";
import { ReactComponent as IconDelete } from "../..//../assets/ico-delete.svg";
import { ReactComponent as ChevronRight } from "../..//../assets/chevron-right.svg";
import { ReactComponent as IconPlus } from "../..//../assets/ico-plus-red.svg";
import { ReactComponent as IconSuccess } from "../..//../assets/ico_success_filled.svg";
import {
  useDeleteETicket,
  useFetchETicketByFlightId,
  useFetchFlightDetail,
  useFetchFlightTrack,
  useFetchFreemiumPackage,
  useFollowFlight,
  usePostClaimFreeTicket,
  useUnfollowFlight,
} from "../..//../network";
import { buttonClick, screenView } from "../..//../network/analytics/tracker";
import { FlightDetailRawData } from "../..//../network/types/response-props";
import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useFlightTicketForm, useSaveTrackingPayload } from "../..//../store/flight";
import Show from "../..//../components/Show";
import moment from "moment";
import { FreemiumLimitModal } from "../..//../modules/FlightForm";
import useToggle from "../..//../hooks/useToggle";
import { toast } from "../..//../components/ui/use-toast";
import useUserPackageStatus from "../..//../hooks/useUserPackageStatus";
import { AxiosError } from "axios";
import { Switch } from "../..//../components/ui/switch";
import FlightRoamaxCard from "../..//../modules/FlightRoamaxCard";

const USER_FREEMIUM_QUOTA = 5;

const DetailPesawat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { active: visibleOffer, toggleActive: toggleOffer } = useToggle();
  const passedFlightData = location.state?.flightDetail;
  const bypassAPICall = !!passedFlightData;

  const flightNumber = searchParams.get("id") || "";
  const flightDate = searchParams.get("date") || "";
  const departure = searchParams.get("departure") || "";
  const arrival = searchParams.get("arrival") || "";

  const { data: rawData, isFetching: fetchingFlightDetail } =
    useFetchFlightDetail(
      flightNumber,
      flightDate,
      departure,
      arrival,
      bypassAPICall
    );

  const flightRawData = rawData?.data as unknown as FlightDetailRawData;
  const flightData = bypassAPICall
    ? passedFlightData
    : flightRawData?.data?.flight;

  const { data: dataPackageRaw, isLoading: isLoadingPackageList } =
    useFetchFreemiumPackage();

  const {
    setTicketName,
    setDepartureDate,
    setPlaneNo,
    resetFlightTicketState,
  } = useFlightTicketForm();

  const { mutateAsync: postFollowFlight, isLoading: loadingFollowFlight } =
    useFollowFlight();

  const { mutateAsync: deleteFollowFlight, isLoading: loadingUnFollowFlight } =
    useUnfollowFlight();

  const { mutateAsync: claimFreeTicket } = usePostClaimFreeTicket();
  const {
    data: rawDataTrackedFlight,
    refetch: refetchTrackedFlight,
    isFetching: loadingFetchTrackedFlight,
  } = useFetchFlightTrack();

  const { data: dataUserPackage } = useUserPackageStatus(!loadingFollowFlight);
  const dataTrackedFlight =
    rawDataTrackedFlight?.data?.data?.tracked_flights ?? [];

  const checkIsBefore = (date1: string, date2: string) => {
    return moment(date1).isBefore(date2);
  };

  const dataFollowFlight = useMemo(() => {
    const followedFlight = [...dataTrackedFlight]?.find(
      (data) =>
        String(data?.flight?.flight_no)?.toUpperCase() ===
        String(flightNumber)?.toUpperCase() &&
        flightDate === moment(data?.flight?.departure_time).format("YYYY-MM-DD")
    );

    return {
      isFollowing: !!followedFlight,
      data: followedFlight,
      isBeforeDeparture: checkIsBefore(
        moment().format("YYYY-MM-DD HH:mm"),
        moment(flightData?.departure_time).format("YYYY-MM-DD HH:mm")
      ),
    };
  }, [dataTrackedFlight, flightData]);

  // Status: schedule/delay/cancel/diversion/return/departure/arrival/diverted
  const eligibleStatus = ["schedule", "delay", "departure"];
  const followableFlight =
    eligibleStatus.includes(flightData?.flight_state) &&
    checkIsBefore(
      moment().format("YYYY-MM-DD HH:mm"),
      moment(flightData?.departure_time).format("YYYY-MM-DD HH:mm")
    );

  const {
    data: eTicketData,
    refetch: refetchETicket,
    remove: removeETicketQuery,
  } = useFetchETicketByFlightId(
    {
      flight_id: dataFollowFlight?.data?.flight_id,
    },
    !!dataFollowFlight?.data?.flight_id
  );
  const foundETicket = eTicketData?.data?.meta?.status === "success";
  const { setTrackFlight } = useSaveTrackingPayload();

  const handleAddTicket = () => {
    resetFlightTicketState();
    setTicketName(
      `${flightData?.departure ?? ""} - ${flightData?.arrival ?? ""}`
    );
    setPlaneNo(flightNumber);
    setDepartureDate(flightDate);
    const flightId = dataFollowFlight?.data?.flight_id;
    return navigate({
      pathname: `/flight/create-ticket/${flightId}`,
    });
  };

  useEffect(() => {
    screenView("Detail", "/detail"); //fire screen view tracker
    claimFreeTicket();
    setTrackFlight(null);
  }, []);

  useEffect(() => {
    if (dataFollowFlight?.data?.flight_id) refetchETicket();
  }, [dataFollowFlight]);

  const formatDate = (date: string | undefined) => {
    return date ? moment(date).format("DD MMM YY") : "-";
  };

  const isButtonLoading =
    loadingFollowFlight ||
    loadingUnFollowFlight ||
    loadingFetchTrackedFlight ||
    fetchingFlightDetail;

  const onProceedPackage = () =>
    navigate({
      pathname: "/flight/package",
    });

  const getLimitType = () => {
    const packageNameUser = dataUserPackage?.package_name;
    const packageList = dataPackageRaw?.data?.data?.packages;
    const limitFlag = packageList?.find(
      (val) => val?.keyword === packageNameUser
    );

    if (dataUserPackage?.new_user === "old") {
      if (limitFlag?.package_type === "quota") {
        return limitFlag?.quota + "x";
      } else if (limitFlag?.package_type === "unlimited") {
        return "Unlimited";
      } else {
        return String(limitFlag?.quota);
      }
    } else {
      return USER_FREEMIUM_QUOTA + "x";
    }
  };

  const handleFollowFlight = useCallback(async () => {
    try {
      const data = await postFollowFlight(flightData);
      const isTracked = data?.data?.data?.status === "tracked";

      if (isTracked) {
        //tracker Follow flight
        buttonClick("Follow Flight", "Follow Flight", "Detail", "/detail");
        toast({
          title: "Notifikasi penerbangan ini telah diaktifkan",
          prefixComponent: <IconSuccess />,
          className:
            "bg-white rounded-full [&_div]:font-normal [&>button]:hidden fixed !top-8 z-[100] flex max-h-screen flex-col-reverse sm:top-auto sm:flex-col max-w-[90vw] !left-0 !right-0 px-4 py-3 m-auto",
          duration: 3000,
        });

        return refetchTrackedFlight();
      }

      if (!isLoadingPackageList) {
        toggleOffer();
        return setTrackFlight(flightData);
      }
    } catch (error) {
      const err = error as AxiosError<{
        meta: { code: number; message: string; status: string };
      }>;

      if (
        String(err?.response?.data?.meta?.message)?.toLowerCase() ===
        "package invalid"
      ) {
        toggleOffer();
        setTrackFlight(flightData);
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description:
            "Sorry, the system is currently busy. Please try again later.",
          className: "bg-[#fef2f4] text-solidRed",
          duration: 3000,
        });
      }
      console.error(error);
    }
  }, [dataUserPackage, flightData, isLoadingPackageList]);

  const handleUnfollowFlight = useCallback(async () => {
    if (dataFollowFlight?.data?.flight_id) {
      try {
        const unfollowFlight = await deleteFollowFlight(
          dataFollowFlight?.data?.flight_id
        );

        buttonClick("Unfollow Flight", "Unfollow Flight", "Detail", "/detail");

        if (unfollowFlight?.data?.meta?.status === "success")
          return refetchTrackedFlight();
      } catch (error) {
        console.error(error);
      }
    }
  }, [dataFollowFlight?.data?.flight_id]);

  const { mutateAsync: deleteETicket, isLoading: loadingDeleteETicket } =
    useDeleteETicket();

  const handleDelete = async () => {
    const eTicketId = eTicketData?.data?.data?.id;
    if (eTicketId) {
      const deleteETicketData = await deleteETicket({ id: eTicketId });
      if (deleteETicketData?.data?.meta?.status === "success") {
        removeETicketQuery();
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          className: "bg-[#fef2f4] text-solidRed",
          duration: 3000,
        });
      }
    }
  };

  const handleOpenTicket = () => {
    const eTicket = eTicketData?.data?.data;
    if (!eTicket?.file_url) return;

    const snackTicketName = eTicket?.ticket_name
      ?.split(" ")
      ?.join("_")
      ?.toLowerCase();

    return navigate("/flight/file-preview", {
      state: {
        fileUrl: eTicket?.file_url,
        fileExt: eTicket?.file_ext,
        fileName: snackTicketName,
      },
    });
  };

  const handleFollowSwitch = () => {
    if (dataFollowFlight?.isFollowing) {
      handleUnfollowFlight();
    } else {
      handleFollowFlight();
    }
  };

  return (
    <>
      <div className="bg-[#183E78] h-full p-8 bg-gradient-to-b from-[40vh] to-[60vh] from-[#183E78] to-white flex flex-col">
        <Navbar color={NavColor.Light} hiddenAction={true} />
        <div className="flex flex-col gap-8 my-4 flex-grow">
          <FlightBoardInfo data={flightData} />
          {/* TODO: fix isRoamaxEligible */}
          <FlightDetailsCard data={flightData} isRoamaxEligible={dataFollowFlight?.isFollowing} />

          <Show when={foundETicket}>
            <div className="flex flex-col gap-y-2 rounded-[16px] bg-white min-h-[50px] -mt-4 p-3 text-left shadow-[0_10px_34px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between items-center">
                <h1 className="text-sm font-semibold">Detail E-Ticket</h1>
                <ChevronRight onClick={handleOpenTicket} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-x-4 items-center">
                  <IconTicketUpload />
                  <div className="flex flex-col justify-between gap-y-1">
                    <div className="flex gap-x-2 items-center">
                      <p className="text-sm font-semibold">
                        {flightData?.departure_code || "-"}
                      </p>
                      <ArrowRight />
                      <p className="text-sm font-semibold">
                        {flightData?.arrival_code || "-"}
                      </p>
                    </div>
                    <p className="text-[10px] text-textSecondary">
                      {formatDate(flightData?.departure_time)} •{" "}
                      {flightData?.flight_no || "-"}
                    </p>
                  </div>
                </div>

                <button data-action="delete" onClick={handleDelete}>
                  <Show when={!loadingDeleteETicket}>
                    <IconDelete />
                  </Show>
                </button>
              </div>
            </div>
          </Show>

          <Show when={followableFlight}>
            <div className="flex flex-col gap-y-2 rounded-[16px] bg-white min-h-[50px] -mt-4 p-3 text-left shadow-[0_10px_34px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between items-center">
                <h1 className="text-sm">Dapatkan Notifikasi Penerbangan</h1>
                <Switch
                  id="follow-switch"
                  className="data-[state=checked]:bg-blueNavy data-[state=checked]:border-blueNavy data-[state=unchecked]:bg-inputGroup border-[#DAE0E9] border-2"
                  checked={dataFollowFlight?.isFollowing}
                  onCheckedChange={handleFollowSwitch}
                  disabled={isButtonLoading}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-x-4 items-center">
                  <span className="text-xs">Terima notifikasi real-time mulai dari check-in hingga pengambilan bagasi, agar perjalanan Anda lebih lancar dan teratur.</span>
                </div>
              </div>
            </div>

            <Show when={dataFollowFlight?.isFollowing}>
              <div className="-mt-4">
                <FlightRoamaxCard isEligible={false} />
              </div>
            </Show>

            <Show when={!foundETicket}>
              <div className="flex flex-col gap-2 -mt-4">
                <button
                  className="inline-flex justify-center items-center text-solidRed font-normal w-full font-sans"
                  onClick={() => {
                    buttonClick("Add Ticket", "Add Ticket", "Detail", "/detail");
                    handleAddTicket();
                  }}
                >
                  Tambah Tiket&nbsp;
                  <IconPlus />
                </button>
              </div>
            </Show>
          </Show>
        </div>

        <FreemiumLimitModal
          onClose={toggleOffer}
          onProceed={onProceedPackage}
          open={visibleOffer}
          limitType={getLimitType()}
        />
      </div>
    </>
  );
};

export default DetailPesawat;
