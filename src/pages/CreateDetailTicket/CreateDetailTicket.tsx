import { Text, View } from "@tarojs/components";
import Button from "../../components/Button";
import ContainerViewPort from "../../components/ContainerViewPort";
import LoadingScreen from "../../components/LoadingScreen";
import Navbar from "../../components/Navbar";
import Show from "../../components/Show";
import { toast } from "../../components/ui/use-toast";
import useToggle from "../../hooks/useToggle";
import FlightTicketCreateSuccessModal from "../../modules/FlightTicketCreateSuccessModal";
import FlightTicketForm from "../../modules/FlightTicketForm";
import FlightTicketUpload from "../../modules/FlightTicketUpload";
import { useFetchETicketByFlightId, usePostCreateETicket } from "../../network";
import { buttonClick } from "../../network/analytics/tracker";
import { CreateETicketPayloadProps } from "../../network/types/request-payload";
import { FlightETicketByFlightIdData } from "../../network/types/response-props";
import { useFlightTicketForm } from "../../store/flight";
import moment from "moment";
import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Taro from "@tarojs/taro";
import { useMemo } from "react";
import { getNavigateState } from "../../lib/utils";

const CreateDetailTicket: React.FC = () => {
  const navigate = useNavigate();
  const flight_id = Taro.getCurrentInstance().router?.params?.flight_id;
  const pageType = Taro.getCurrentInstance().router?.params?.type;

  const currentPath = Taro.getCurrentInstance().router?.path || "";
  const state = useMemo(() => getNavigateState(currentPath), [currentPath]);
  const stateData = state?.ticket as FlightETicketByFlightIdData;

  const pageMode = pageType === "detail" ? "detail" : "create";

  const pageTitle = pageMode === "detail" ? "Detail My Ticket" : "Tambah Tiket";

  const isDetailMode = pageMode === "detail";

  const {
    ticketName,
    departureDate,
    planeNo,
    eTicket,
    setDepartureDate,
    setPlaneNo,
    setTicketName,
    setETicket,
    resetFlightTicketState,
    setError,
  } = useFlightTicketForm();

  /* 
    Condition:
    1. Page mode =  Detail
    2. State Data Not Undefined
    3. Flight Id === 0
  */
  const flightId = Number(flight_id ?? 0);
  const shouldFetchData = pageMode === "detail" && !stateData;

  const { data: dataETicketRaw, isFetching: fetchingETicket } =
    useFetchETicketByFlightId({ flight_id: flightId }, shouldFetchData);

  const { mutateAsync: postCreateETicket, isLoading: loadingCreateETicket } =
    usePostCreateETicket();

  const {
    active: visibleCreateSuccessModal,
    toggleActive: toggleVisibleCreateSuccessModal,
  } = useToggle();

  const dataETicketByFlightId = dataETicketRaw?.data?.data ?? stateData;

  const isLoading = fetchingETicket || loadingCreateETicket;

  const validateFields = () => {
    const newErrors = {
      ticketName: ticketName ? "" : "Wajib diisi",
      departureDate: departureDate ? "" : "Wajib diisi",
      planeNo: planeNo ? "" : "Wajib diisi",
      eTicket: eTicket ? "" : "Wajib diisi",
    };
    setError(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleButtonClick = async () => {
    buttonClick("Next", "Finish Add Ticket", "Create Ticket");

    if (!validateFields()) return;

    const payloadData: CreateETicketPayloadProps = {
      file_ext: eTicket?.file_ext ?? "",
      file_mime: eTicket?.file_mime ?? "",
      file_url: eTicket?.file_url ?? "",
      flight_no: planeNo,
      ticket_date: moment(departureDate)?.format("YYYY-MM-DD"),
      ticket_name: ticketName,
      ...(flight_id ? { flight_id: flightId } : {}),
    };
    try {
      const createTicket = await postCreateETicket(payloadData);
      const ticketData = createTicket?.data;

      if (ticketData?.meta?.status === "success") {
        return toggleVisibleCreateSuccessModal();
      }
    } catch (_) {
      toast({
        title: "Gagal Membuat E Ticket",
        description: "Pastikan koneksi internet anda tidak bermasalah",
        className: "bg-[#fef2f4] text-solidRed",
        duration: 3000,
      });
    }
  };

  const handleRedirectMyTicket = () => {
    resetFlightTicketState();
    /* Note: why replace it so you can't go back to the create ticket page, when you want to open create ticket you have to go from the entry point */
    navigate("/flight/ticket-list", { replace: true });
  };

  const handleBackCallback = () => {
    resetFlightTicketState();
  };

  /* Prefilled form on detail page */
  React.useEffect(() => {
    if (pageMode === "detail") {
      setTicketName(dataETicketByFlightId?.ticket_name ?? "");
      setDepartureDate(dataETicketByFlightId?.ticket_date ?? "");
      setPlaneNo(dataETicketByFlightId?.flight_no ?? "");
      setETicket({
        file_ext: dataETicketByFlightId?.file_ext ?? "",
        file_mime: dataETicketByFlightId?.file_mime ?? "",
        file_url: dataETicketByFlightId?.file_url ?? "",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageMode, dataETicketByFlightId]);

  if (isLoading) return <LoadingScreen text="Loading..." />;

  return (
    <ContainerViewPort>
      <View className="flex flex-col justify-between bg-inactiveGrey py-4 px-[16px] h-full overflow-hidden">
        <form encType="multipart/form-data">
          <div>
            {/* <Navbar
              onBackCallback={handleBackCallback}
              hiddenAction
              title={pageTitle}
              className="my-0"
            /> */}

            <div className="flex flex-col my-[8px] rounded-[16px] bg-white min-h-[50px] p-4">
              <FlightTicketForm pageMode={pageMode} />
              <FlightTicketUpload
                pageMode={pageMode}
                data={dataETicketByFlightId}
              />
            </div>
          </div>
        </form>

        {/* <Show when={!dataETicketByFlightId && !isDetailMode}> */}
          <Button label="Simpan" onClick={handleButtonClick} />
        {/* </Show> */}

        {/* <FlightTicketCreateSuccessModal
          open={visibleCreateSuccessModal}
          onClose={toggleVisibleCreateSuccessModal}
          onClickCTA={handleRedirectMyTicket}
        /> */}
      </View>
    </ContainerViewPort>
  );
};

export default CreateDetailTicket;
