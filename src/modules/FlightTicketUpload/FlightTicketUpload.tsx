import * as React from "react";
import IconTicketUpload from "../../assets/icon-ticket-upload.svg";
import IconPlus from "../../assets/ico-plus.svg";
import IconDelete from "../../assets/ico-delete.svg";
import ChevronRight from "../../assets/chevron-right.svg";
import Show from "../../components/Show";
import SelectUploadMedia from "./components/SelectUploadMedia";
import useToggle from "../../hooks/useToggle";
import { useFlightTicketForm } from "../../store/flight";
import { FlightETicketByFlightIdData } from "../../network/types/response-props";
import moment from "moment";
import LoadingScreen from "../../components/LoadingScreen";
import { useDeleteETicket, usePostUploadETicketFile } from "../../network";
import { toast } from "../../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { buttonClick } from "../../network/analytics/tracker";
import { Image } from "@tarojs/components";
import { handleNavigate } from "../../lib/utils";

interface Props {
  pageMode: "detail" | "create";
  data?: FlightETicketByFlightIdData;
}

const FlightTicketUpload: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { setETicket, eTicket, planeNo, ticketName, error, setError } =
    useFlightTicketForm();

  const { active: visibleUploadMedia, setActive: toggleVisibleUploadMedia } =
    useToggle();

  const { mutateAsync: postUploadETicket, isLoading: isLoadingUploadFile } =
    usePostUploadETicketFile();

  const isTicketUploaded = !!eTicket;
  const isShowDetailETicket = !!eTicket;

  const { mutateAsync: deleteETicket, isLoading: loadingDeleteETicket } =
    useDeleteETicket();

  const handleAddImage = (event: React.SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (visibleUploadMedia) return;

    if (isTicketUploaded) return handleOpenTicket();

    buttonClick("Add E-Ticket", "Upload E-Ticket", "Create ticket");
    toggleVisibleUploadMedia(true);
  };

  const handleDeleteImage = async (event) => {
    event.stopPropagation();

    buttonClick("Delete E-Ticket", "Delete E-Ticket", "Create ticket");

    if (data?.id) {
      const deleteETicketData = await deleteETicket({ id: data.id });
      if (deleteETicketData?.data?.meta?.status === "success") {
        handleNavigate("/pages/MyTicketList/index");
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          className: "bg-[#fef2f4] text-solidRed",
          duration: 3000,
        });
      }
    } else {
      setETicket(null);
    }
  };

  const handleSelectImage = async (filePath: string) => {
    console.log("BEFORE UPLOAD");

    try {
      const uploadFile = await postUploadETicket(filePath);
      // @ts-ignore
      const dataFile = JSON.parse(uploadFile?.data);
      const isSuccessUpload = !!dataFile;

      if (isSuccessUpload) {
        const theDataFile = dataFile?.[0];
        setError({ ...error, eTicket: "" });
        return setETicket({
          file_ext: theDataFile?.ext,
          file_mime: theDataFile?.mime,
          file_url: theDataFile?.url,
        });
      }
    } catch (err) {
      toast({
        title: "Gagal Mengunggah Gambar",
        description: "Pastikan koneksi internet anda tidak bermasalah",
        className: "bg-[#fef2f4] text-solidRed",
        duration: 3000,
      });
    }
  };

  const handleOpenTicket = () => {
    if (!eTicket?.file_url) return;

    const snackTicketName = ticketName?.split(" ")?.join("_")?.toLowerCase();

    // window.open(eTicket?.file_url, "_blank");
    return handleNavigate("/pages/PreviewImageDocs/index", "", {
      state: {
        fileUrl: eTicket?.file_url,
        fileExt: eTicket?.file_ext,
        fileName: snackTicketName,
      },
    });
  };

  if (isLoadingUploadFile)
    return (
      <LoadingScreen text="Upload E-Ticket.." customClassName="mx-[20px]" />
    );

  return (
    <>
      <div
        className={`flex flex-col  bg-white min-h-[50px] p-3 rounded-[12px] border-solid border-[1px] ${
          error.eTicket ? "mb-2 border-red-500" : "mb-4 border-gray-300"
        }`}
      >
        <Show when={isShowDetailETicket}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold">Detail E-Ticket</span>
            <Image
              src={ChevronRight}
              style={{ width: "24px", height: "24px" }}
              onClick={handleOpenTicket}
            />
          </div>
        </Show>

        <div
          onClick={handleAddImage}
          className={`flex items-center justify-between ${
            !isTicketUploaded ? "cursor-pointer" : ""
          }`}
        >
          <div className="flex gap-x-4 items-center">
            <Image
              src={IconTicketUpload}
              style={{ width: "48px", height: "49px" }}
            />
            <Show
              when={isTicketUploaded}
              fallbackComponent={<p className="text-[16px]">Upload E-Ticket</p>}
            >
              <div className="flex flex-col justify-between gap-y-1">
                <div className="flex gap-x-2 items-center">
                  <p className="text-[10px] font-semibold">E-Ticket</p>
                </div>
                <p className="text-[10px] text-textSecondary">
                  {moment(data?.ticket_date)?.format("DD MMM YYYY")} •{" "}
                  {data?.flight_no ?? planeNo ?? "-"}
                </p>
              </div>
            </Show>
          </div>

          <div className="flex items-center">
            <Show
              when={isTicketUploaded && !loadingDeleteETicket}
              fallbackComponent={
                <Image
                  src={IconPlus}
                  style={{ width: "24px", height: "25px" }}
                />
              }
            >
              <Image
                src={IconDelete}
                style={{ width: "24px", height: "24px" }}
                onClick={handleDeleteImage}
              />
            </Show>
          </div>
        </div>

        <SelectUploadMedia
          open={visibleUploadMedia}
          onClose={() => toggleVisibleUploadMedia(false)}
          onSelectImage={handleSelectImage}
        />
      </div>
      {error.eTicket && (
        <div className="text-red-500 text-xs mb-4">{error.eTicket}</div>
      )}
    </>
  );
};

export default FlightTicketUpload;
