//import { useParams } from "react-router-dom";
import { Image } from "@tarojs/components";
// import Button from "../..//../components/Button";
// import Navbar, { NavColor } from "../..//../components/Navbar";
// import FlightBoardInfo from "../..//../modules/FlightBoardInfo";
// import FlightDetailsCard from "../..//../modules/FlightDetailsCard";
// import { ReactComponent as IconTicketUpload } from "../..//../assets/icon-ticket-upload.svg";
import { ReactComponent as ArrowRight } from "../../../assets/arrow-right.svg";
// import { ReactComponent as IconDelete } from "../..//../assets/ico-delete.svg";
// import { ReactComponent as ChevronRight } from "../..//../assets/chevron-right.svg";
// import { ReactComponent as IconPlus } from "../..//../assets/ico-plus-red.svg";
// import { ReactComponent as IconSuccess } from "../..//../assets/ico_success_filled.svg";
// import Navbar, { NavColor } from "../../components/Navbar";
import { FlightDetailTrackData } from "../../network/types/response-props";
import FlightBoardInfo from "../../modules/FlightBoardInfo";
import { FreemiumLimitModal } from "../../modules/FlightForm";
import FlightDetailsCard from "../../modules/FlightDetailsCard";
import Show from "../../components/Show";
import { Switch } from "../../components/ui/switch";
import { EventChannel } from "@tarojs/shared";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
// import moment from "moment";
// import { FreemiumLimitModal } from "@/modules/FlightForm";
// import useToggle from "@/hooks/useToggle";
// import { toast } from "@/components/ui/use-toast";
// import useUserPackageStatus from "@/hooks/useUserPackageStatus";
// import { AxiosError } from "axios";
// import { Switch } from "@/components/ui/switch";
// import FlightRoamaxCard from "@/modules/FlightRoamaxCard";

const USER_FREEMIUM_QUOTA = 5;

const DetailPesawat = () => {

  const location = useLocation();
  const flightDetail = location.state?.flightDetail;
  
  // {
  //   created_at: "2023-07-15T10:30:00Z",
  //   flight_id: 12345,
  //   insider_uuid: "abc123-def456-ghi789",
  //   updated_at: "2023-07-15T11:45:00Z",
  //   flight: {
  //     id: "FL123",
  //     user_id: "USER456",
  //     flight_no: "GA456",
  //     flight_company: "Garuda Indonesia",
  //     flight_logo: "https://example.com/garuda-logo.png",
  //     flight_generic: "Airbus A330",
  //     flight_state: "On Time",
  //     flight_duration: "2h 30m",
  //     checkin_counter: "A1-A5",
  //     boarding_gate: "G7",
  //     arrival_gate: "D3",
  //     baggage_carousel: "5",
  //     departure: "Jakarta",
  //     departure_airport: "Soekarno-Hatta International Airport",
  //     departure_code: "CGK",
  //     departure_terminal: "3",
  //     departure_time: "2023-07-16T08:00:00Z",
  //     arrival: "Bali",
  //     arrival_airport: "Ngurah Rai International Airport",
  //     arrival_code: "DPS",
  //     arrival_terminal: "International",
  //     arrival_time: "2023-07-16T10:30:00Z",
  //     created_at: "2023-07-01T00:00:00Z",
  //     updated_at: "2023-07-15T11:45:00Z"
  //   }
  // };

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
  };

  return (
    <>
      <div className="bg-[#183E78] h-full p-8 bg-gradient-to-b from-[40vh] to-[60vh] from-[#183E78] to-white flex flex-col">
        {/* <Navbar color={NavColor.Light} hiddenAction={true} /> */}
        <div className="flex flex-col gap-8 my-4 flex-grow">
          <FlightBoardInfo data={flightDetail} />
          <FlightDetailsCard data={flightDetail} isRoamaxEligible={false} />
        </div>

        <Show when={true}>
          <div className="flex flex-col gap-y-2 rounded-[16px] bg-white min-h-[50px] -mt-4 p-3 text-left shadow-[0_10px_34px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-center">
              <h1 className="text-sm font-semibold">Detail E-Ticket</h1>
              {/* <ChevronRight onClick={handleOpenTicket} /> */}
              <Image 
                style='width: 24px;height: 24px;'
                src={"../../../assets/chevron-right.svg"} 
                onClick={handleOpenTicket}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-x-4 items-center">
                <Image 
                  style='width: 48px;height: 49px;'
                  src={"../../../assets/icon-ticket-upload.svg"} />
                <div className="flex flex-col justify-between gap-y-1">
                  <div className="flex gap-x-2 items-center">
                    <p className="text-sm font-semibold">
                      {/* {flightData?.departure_code || "-"} */}
                    </p>
                    {/* <ArrowRight /> */}
                    <p className="text-sm font-semibold">
                      {/* {flightData?.arrival_code || "-"} */}
                    </p>
                  </div>
                  <p className="text-[10px] text-textSecondary">
                    {/* {formatDate(flightData?.departure_time)} •{" "}
                    {flightData?.flight_no || "-"} */}
                  </p>
                </div>
              </div>

              <button data-action="delete" onClick={() => { }}>
                <Show when={true}>
                  {/* <IconDelete /> */}
                </Show>
              </button>
            </div>
          </div>
        </Show>

        <Show when={true}>
          <div className="flex flex-col gap-y-2 rounded-[16px] bg-white min-h-[50px] -mt-4 p-3 text-left shadow-[0_10px_34px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-center">
              <h1 className="text-sm">Dapatkan Notifikasi Penerbangan</h1>
              <Switch
                id="follow-switch"
                className="data-[state=checked]:bg-blueNavy data-[state=checked]:border-blueNavy data-[state=unchecked]:bg-inputGroup border-[#DAE0E9] border-2"
                checked={true}
                onCheckedChange={() => { }}
                disabled={false}
              />
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
            <div className="flex flex-col gap-2 -mt-4">
              <button
                className="inline-flex justify-center items-center text-solidRed font-normal w-full font-sans"
                onClick={() => { }}
              >
                Tambah Tiket&nbsp;
                {/* <IconPlus /> */}
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
