//import { useParams } from "react-router-dom";
import { Button, Image, Switch } from "@tarojs/components";
import { useEffect, useState } from "react";
// import Navbar, { NavColor } from "../..//../components/Navbar";
import ChevronRight from "../../assets/chevron-right.svg"
import TicketUpload from "../../assets/icon-ticket-upload.svg"
import IconDelete from "../../assets/ico-delete.svg";
// import { ReactComponent as ChevronRight } from "../..//../assets/chevron-right.svg";
import IconPlus from "../../assets/ico-plus-red.svg";
// import { FlightDetailRawData, FlightDetailTrackData } from "../../network/types/response-props";
import FlightBoardInfo from "../../modules/FlightBoardInfo";
// import { FreemiumLimitModal } from "../../modules/FlightForm";
import FlightDetailsCard from "../../modules/FlightDetailsCard";
import Show from "../../components/Show";

import { useLocation, useSearchParams } from "react-router-dom";
// import {
//   useDeleteETicket,
//   useFetchETicketByFlightId,
//   useFetchFlightDetail,
//   useFetchFlightTrack,
//   useFetchFreemiumPackage,
//   useFollowFlight,
//   usePostClaimFreeTicket,
//   useUnfollowFlight,
// } from "@/network";
// import { buttonClick, screenView } from "@/network/analytics/tracker";
// import { FlightDetailRawData } from "@/network/types/response-props";
// import { useCallback, useEffect, useMemo } from "react";
// import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
// import { useFlightTicketForm, useSaveTrackingPayload } from "@/store/flight";
// import Show from "../..//../components/Show";
import moment from "moment";
import useToggle from "@/hooks/useToggle";
import { useFetchFlightDetail } from "../../network";
import { FlightDetailRawData } from "../../network/types/response-props";
// import { FreemiumLimitModal } from "@/modules/FlightForm";
// import useToggle from "@/hooks/useToggle";
// import { toast } from "@/components/ui/use-toast";
// import useUserPackageStatus from "@/hooks/useUserPackageStatus";
// import { AxiosError } from "axios";
// import { Switch } from "@/components/ui/switch";
// import FlightRoamaxCard from "@/modules/FlightRoamaxCard";

const USER_FREEMIUM_QUOTA = 5;

const DetailPesawat = () => {

  const [isFollowSwitch, setIsFollowSwitch] = useState(true);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  // const { active: visibleOffer, toggleActive: toggleOffer } = useToggle();
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

  // const { data: dataPackageRaw, isLoading: isLoadingPackageList } =
  //   useFetchFreemiumPackage();
  
  const formatDate = (date: string | undefined) => {
    return date ? moment(date).format("DD MMM YY") : "-";
  };

  const handleDelete = async () => {
    // const eTicketId = eTicketData?.data?.data?.id;
    // if (eTicketId) {
    //   const deleteETicketData = await deleteETicket({ id: eTicketId });
    //   if (deleteETicketData?.data?.meta?.status === "success") {
    //     removeETicketQuery();
    //   } else {
    //     toast({
    //       title: "Uh oh! Something went wrong.",
    //       description: "There was a problem with your request.",
    //       className: "bg-[#fef2f4] text-solidRed",
    //       duration: 3000,
    //     });
    //   }
    // }
  };

  const handleOpenTicket = () => {
    // const eTicket = eTicketData?.data?.data;
    // if (!eTicket?.file_url) return;

    // const snackTicketName = eTicket?.ticket_name
    //   ?.split(" ")
    //   ?.join("_")
    //   ?.toLowerCase();

    // return navigate("/flight/file-preview", {
    //   state: {
    //     fileUrl: eTicket?.file_url,
    //     fileExt: eTicket?.file_ext,
    //     fileName: snackTicketName,
    //   },
    // });
  };

  const handleFollowSwitch = () => {
    // if (dataFollowFlight?.isFollowing) {
    //   handleUnfollowFlight();
    // } else {
    //   handleFollowFlight();
    // }

    setIsFollowSwitch(!isFollowSwitch);
  };

  return (
    <>
      <div className="bg-[#183E78] h-full p-8 bg-gradient-to-b from-[40vh] to-[60vh] from-[#183E78] to-white flex flex-col">
        {/* <Navbar color={NavColor.Light} hiddenAction={true} /> */}
        <div className="flex flex-col gap-8 my-4 flex-grow">
          <FlightBoardInfo data={flightData} />
          <FlightDetailsCard data={flightData} isRoamaxEligible={false} />
        </div>

        <Show when={true}>
          <div className="flex flex-col gap-y-2 rounded-[16px] bg-white min-h-[50px] p-3 text-left shadow-[0_10px_34px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-center">
              <h1 className="text-sm font-semibold">Detail E-Ticket</h1>
              <Image 
                src={ChevronRight} 
                style={{
                  width: '24px',
                  height: '24px'
                }}
                onClick={handleOpenTicket}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-x-4 items-center">
                <Image 
                  src={TicketUpload} 
                  style={{
                    width: '48px',
                    height: '49px'
                  }}
                />
                <div className="flex flex-col justify-between gap-y-1">
                  <div className="flex gap-x-2 items-center">
                    <p className="text-sm font-semibold">
                      {flightData?.departure_code || "-"}
                    </p>
                    {/* <ArrowRight /> */}
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

              <Show when={true}>
                  <Image 
                    src={IconDelete} 
                    style={{
                      width: '24px',
                      height: '24px'
                    }}
                    onClick={handleDelete}
                  />
                </Show>
            </div>
          </div>
        </Show>

        <Show when={true}>
          <div className="flex flex-col gap-y-2 rounded-[16px] bg-white min-h-[50px] mt-4 p-3 text-left shadow-[0_10px_34px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-center">
              <h1 className="text-sm">Dapatkan Notifikasi Penerbangan</h1>
              <Switch checked={isFollowSwitch} onChange={handleFollowSwitch} color="#001A41"/>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-x-4 items-center">
                <span className="text-xs">Terima notifikasi real-time mulai dari check-in hingga pengambilan bagasi, agar perjalanan Anda lebih lancar dan teratur.</span>
              </div>
            </div>
          </div>

          {/* <Show when={true}>
            <div className="-mt-4">
              <FlightRoamaxCard isEligible={false} />
            </div>
          </Show> */}

          <Show when={true}>
            <div className="flex flex-col gap-2 mt-4">
              <button
                className="inline-flex justify-center items-center text-solidRed font-normal w-full bg-transparent text-sm"
                onClick={() => { }}
              >
                <span className="text-sm">Tambah Tiket&nbsp;</span>
                <Image 
                  src={IconPlus} 
                  style={{
                    width: '24px',
                    height: '24px'
                  }}
                />
              </button>
            </div>
          </Show>
        </Show>
      </div>


      {/* <FreemiumLimitModal
          onClose={() => {}}
          onProceed={() => {}}
          open={false}
          limitType={"Unlimited"}
        /> */}

    </>
  );
};

export default DetailPesawat;
