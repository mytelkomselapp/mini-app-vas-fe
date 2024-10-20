import { ReactComponent as Failed } from "../../assets/failed.svg";
import { ReactComponent as Thumbs } from "../../assets/thumbs-up.svg";
import { ReactComponent as Pending } from "../../assets/waiting.svg";
import Button from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";
import Show from "../../components/Show";
import { useBuyPackage, useFollowFlight } from "../../network";
import { buttonClick, screenView } from "../../network/analytics/tracker";
import { FlightBuyFreemiumPackageProps } from "../../network/types/response-props";
import {
  useSaveTrackingPayload,
  useWeboptinTokenData,
} from "../../store/flight";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TransactionStatus = () => {
  interface PropTypes {
    data?: FlightBuyFreemiumPackageProps;
    isActive: string;
    createdAt: string;
    transactionId: string;
    paymentMethod: string;
  }
  const [buyDetail, setBuyDetail] = useState<PropTypes>({
    isActive: "payment-failed",
    createdAt: "",
    transactionId: "",
    paymentMethod: "",
  });

  const navigate = useNavigate();
  const { trackFlight, setTrackFlight } = useSaveTrackingPayload();
  const { mutateAsync: postBuyPackage, isLoading: loadingBuyPackage } =
    useBuyPackage();
  const { mutateAsync: postFollowFlight, isLoading: loadingFollowFlight } =
    useFollowFlight();
  const { setSid, sid } = useWeboptinTokenData();
  // const statusPayment = location?.pathname
  //   .slice(location.pathname.lastIndexOf("/"), location.pathname.length)
  //   ?.replace("/", "");

  const getTrxDetail = async () => {
    try {
      const buyPackage = await postBuyPackage({ package_id: Number(sid) });
      console.log({ buyPackage });
      setBuyDetail({
        createdAt: buyPackage?.data?.data?.created_at,
        data: buyPackage?.data?.data,
        isActive: buyPackage?.data?.data?.package
          ? "payment-success"
          : "payment-failed",
        transactionId: buyPackage?.data?.data?.transaction_id,
        paymentMethod: buyPackage?.data?.data?.payment_method,
      });
      doFollowTrack();
    } catch (error) {
      setBuyDetail({
        data: buyDetail?.data,
        isActive: "payment-failed",
        createdAt: buyDetail?.createdAt,
        transactionId: buyDetail?.transactionId,
        paymentMethod: buyDetail?.paymentMethod,
      });
      console.error(error);
    }
  };

  const doFollowTrack = async () => {
    try {
      if (trackFlight) {
        const followFlight = await postFollowFlight(trackFlight);
        if (followFlight?.data?.meta?.status === "success") {
          setTrackFlight(null);
          setSid(null);
        } else {
          console.error(followFlight);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusPayment = () => {
    switch (buyDetail?.isActive) {
      case "payment-success":
        return {
          icon: <Thumbs />,
          title: "Transaksi Berhasil",
          subtitle: "Pembayaran kamu berhasil, paket telah diaktifkan",
          status: buyDetail?.isActive,
        };
      case "payment-failed":
        return {
          icon: <Failed />,
          title: "Pembayaran Gagal",
          subtitle:
            "Verifikasi pembayaran tidak berhasil, silahkan ulangi pembayaran",
          status: buyDetail?.isActive,
        };
      case "payment-waiting":
      case "payment-pending":
        return {
          icon: <Pending />,
          title: "Transaksi dalam Proses",
          subtitle: "Mohon menuggu verifikasi pembayaran dan aktivasi paket",
          status: buyDetail?.isActive,
        };
      default:
        console.error({ statusPayment: buyDetail?.data });
        return {
          icon: "",
          title: "-",
          subtitle: "-",
          status: buyDetail?.isActive,
        };
    }
  };
  const { icon, title, subtitle, status } = getStatusPayment();
  useEffect(() => {
    console.log({ sid });
    if (sid) {
      getTrxDetail();
      console.log({ sidSuccess: sid });
    } else {
      console.log("exception", sid);
    }
  }, [sid]);

  useEffect(() => {
    screenView("Flight Tracking Status Payment", "/payment-status"); //fire screen view tracker
  }, []);

  return (
    <>
      <div className="text-[16px] font-sans bg-[#EFF1F4] flex flex-col items-center justify-center pt-4">
        Status Pembayaran
      </div>
      <Show
        when={!loadingBuyPackage}
        fallbackComponent={<LoadingScreen text="Loading..." />}
      >
        <div className="flex flex-col items-center bg-[#EFF1F4] h-4/5">
          <div className="p-2 max-w-sm w-full">
            <div className="flex justify-center mb-4 mt-5">{icon}</div>
            <h2 className="text-center text-sm font-sans font-semibold mb-2">
              {title}
            </h2>
            <p className="text-center text-gray-600 mb-4 text-xs">{subtitle}</p>
            <div className="bg-gray-100 p-4 rounded-xl mb-4 border-[1px] border-white">
              <h3 className="font-semibold mb-3 text-xs">Status Transaksi</h3>

              <ul className="space-y-2 relative">
                <li className="flex items-center mb-6">
                  <Circle
                    type={
                      status === "payment-success"
                        ? "circle-check"
                        : status === "payment-waiting" ||
                          status === "payment-pending"
                        ? "hollow"
                        : status === "payment-failed"
                        ? "cross"
                        : "circle-check"
                    }
                    color={
                      status === "payment-success"
                        ? "#008E53"
                        : status === "payment-failed"
                        ? "inherit"
                        : "#008E53"
                    }
                  />

                  <span className="ml-2 text-grey text-xs">
                    Verifikasi pembayaran berhasil
                  </span>
                </li>

                <div className="absolute left-2 right-0 top-0 bottom-0">
                  <Stroke />
                </div>
                <li className="flex items-center mt-[24px]">
                  <Circle
                    type={
                      status === "payment-success"
                        ? "circle-check"
                        : status === "payment-waiting" ||
                          status === "payment-pending" ||
                          status === "payment-failed"
                        ? "hollow-white"
                        : "circle-check"
                    }
                    color={
                      status === "payment-success"
                        ? "#008E53"
                        : status === "payment-failed"
                        ? "#00FFFFFF"
                        : status === "payment-waiting" ||
                          status === "payment-pending"
                        ? "#FFFF"
                        : "#008E53"
                    }
                  />
                  <span className="ml-2 text-grey text-xs">
                    Aktivasi paket berhasil
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl border-[1px] border-white text-xs font-sans ">
              <h3 className="font-semibold  mb-3 text-xs">Detail Transaksi</h3>

              <p className="flex mb-2 text-[#353941]">
                Tanggal:{" "}
                <span className="ml-auto">
                  {moment(buyDetail?.createdAt)?.isValid()
                    ? moment(buyDetail?.createdAt)?.format("DD/MM/YYYY")
                    : "-"}
                </span>
              </p>
              <p className="flex mb-2 text-[#353941]">
                No. Transaksi:{" "}
                <span className=" ml-auto">
                  {buyDetail?.transactionId ?? "-"}
                </span>
              </p>
              <p className="flex mb-2 text-[#353941]">
                Metode Pembayaran:{" "}
                <span className="first-letter:uppercase ml-auto">
                  {buyDetail?.paymentMethod || "-"}
                </span>
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="311"
                height="1"
                viewBox="0 0 311 1"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 0.5C0 0.223858 0.235202 0 0.525338 0H310.475C310.765 0 311 0.223858 311 0.5C311 0.776142 310.765 1 310.475 1H0.525338C0.235202 1 0 0.776142 0 0.5Z"
                  fill="#EFF1F4"
                />
              </svg>
              <p className="flex mb-2 mt-2 text-[#353941]">
                {buyDetail?.data?.package?.quota || "-"}
                {isNaN(Number(buyDetail?.data?.package?.quota)) ? "" : "x"}{" "}
                Ikuti Penerbangan
                <span className="ml-auto text-[#353941]">
                  {buyDetail?.data?.package?.price?.toLocaleString("id") || "-"}
                </span>
              </p>
              <p className="font-semibold flex">
                Total Harga:{" "}
                <span className="ml-auto">
                  {buyDetail?.data?.package?.price?.toLocaleString("id") || "-"}
                </span>
              </p>
            </div>
            <p className="text-xs text-[#353941] mt-[32px]">
              Punya pertanyaan tentang transaksi ini?
            </p>
            <p
              className="text-xs text-solidRed mt-2 flex mb-[37px]"
              onClick={() =>
                window.open("https://my.telkomsel.com/app/chatbot", "_blank")
              }
            >
              {"Dapatkan Bantuan"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="ml-[1px]"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.5075 7.56648C10.7215 7.81614 10.7215 8.18454 10.5075 8.4342L6.50747 13.1009C6.26786 13.3804 5.84699 13.4128 5.56744 13.1732C5.28789 12.9336 5.25552 12.5127 5.49513 12.2331L9.12325 8.00034L5.49513 3.76753C5.25552 3.48798 5.28789 3.06711 5.56744 2.8275C5.84699 2.58788 6.26786 2.62026 6.50747 2.89981L10.5075 7.56648Z"
                  fill="#FF0025"
                />
              </svg>
            </p>
          </div>
        </div>
        <div className="text-center bg-white p-4">
          <Button
            label={
              status === "payment-failed"
                ? "Ulangi Pembayaran"
                : "Cek Penerbangan"
            }
            className="h-12"
            onClick={() => {
              if (status === "payment-failed") {
                buttonClick(
                  "Retry Payment",
                  "Retry Payment",
                  "Flight Tracking Status Payment",
                  "/payment-status"
                );
                navigate({
                  pathname: "/flight/package",
                });
              } else {
                buttonClick(
                  "Check Flight",
                  "Check Flight",
                  "Flight Tracking Status Payment",
                  "/payment-status"
                );
                navigate({
                  pathname: "/flight/list-following",
                });
              }
            }}
          />
          <Button
            style="secondary"
            label="Kembali ke Lacak Pesawat"
            className="mt-4 h-12"
            onClick={() => {
              buttonClick(
                "Back to Track Flight",
                "Back to Track Flight",
                "Flight Tracking Status Payment",
                "/payment-status"
              );
              navigate({
                pathname: "/flight",
              });
            }}
          />
          {/* <button className="bg-red-500 text-white py-2 px-4 rounded-full mb-2 w-full">
          Cek Penerbangan
        </button>
        <button className="bg-gray-300 text-black py-2 px-4 rounded-full w-full">
          Kembali ke Lacak Pesawat
        </button> */}
        </div>
      </Show>
    </>
  );
};

const Circle = ({
  type,
  color,
}: {
  type?: string;
  color?: string | "#008E53";
}) => {
  return (
    <div
      className={`relative z-10  rounded-full w-5 h-5 flex items-center justify-center ${
        type === "hollow"
          ? "bg-inherit"
          : type === "circle-check"
          ? `bg-[#008E53]`
          : "bg-[${color}]"
      }`}
    >
      {type === "hollow" ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.8 8C4.8 9.76731 6.23269 11.2 8 11.2C9.76731 11.2 11.2 9.76731 11.2 8C11.2 6.23269 9.76731 4.8 8 4.8C6.23269 4.8 4.8 6.23269 4.8 8Z"
            fill="#008E53"
          />
        </svg>
      ) : type === "hollow-white" ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Component 2">
            <path
              id="on process"
              d="M13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C4.96243 13.5 2.5 11.0376 2.5 8C2.5 4.96243 4.96243 2.5 8 2.5C11.0376 2.5 13.5 4.96243 13.5 8Z"
              fill="#FAFAFB"
              stroke="#EDECF0"
              stroke-width="5"
            />
          </g>
        </svg>
      ) : type === "cross" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.0828 4.91716C10.9266 4.76095 10.6734 4.76095 10.5172 4.91716L8 7.43431L5.48284 4.91716C5.32663 4.76095 5.07337 4.76095 4.91716 4.91716C4.76095 5.07337 4.76095 5.32663 4.91716 5.48284L7.43432 8L4.91716 10.5172C4.76095 10.6734 4.76095 10.9266 4.91716 11.0828C5.07337 11.2391 5.32663 11.2391 5.48284 11.0828L8 8.56569L10.5172 11.0828C10.6734 11.2391 10.9266 11.2391 11.0828 11.0828C11.2391 10.9266 11.2391 10.6734 11.0828 10.5172L8.56569 8L11.0828 5.48284C11.2391 5.32663 11.2391 5.07337 11.0828 4.91716Z"
            fill="#B70F17"
          />
        </svg>
      ) : (
        <svg
          className="text-white w-3 h-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      )}
    </div>
  );
};

const Stroke = () => {
  return <div className="h-[38px] bg-[#EDECF0] flex w-[3px]" />;
};

export default TransactionStatus;
